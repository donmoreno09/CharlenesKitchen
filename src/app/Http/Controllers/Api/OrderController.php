<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService,
        private OrderRepositoryInterface $orderRepository,
    ) {}

    // GET /api/orders
    // Returns all orders belonging to the authenticated user.
    public function index(Request $request): AnonymousResourceCollection
    {
        $orders = $this->orderRepository->findByUser($request->user()->id);
        return OrderResource::collection($orders);
    }

    // GET /api/orders/{order}
    // Returns a single order — only if it belongs to the authenticated user.
    // Authorization is enforced by the Policy applied in Step 6.
    public function show(Order $order): OrderResource
    {
        $order->load('orderItems');
        return new OrderResource($order);
    }

    // POST /api/orders
    // Places a new order — works for both guests and authenticated users.
    // StoreOrderRequest validates the payload before this method runs.
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Build the core order data.
        // If the user is authenticated, attach their ID.
        // If not (guest), user_id stays null — the Order model's boot()
        // hook will auto-generate the guest_token.
        $orderData = [
            'customer_name'  => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'] ?? null,
            'notes'          => $validated['notes'] ?? null,
            'user_id'        => $request->user()?->id, // ?-> returns null for guests
        ];

        // Delegate the business logic entirely to OrderService.
        // The controller's only job is to parse the HTTP request
        // and return an HTTP response.
        $order = $this->orderService->placeOrder($orderData, $validated['cart_items']);

        return (new OrderResource($order))
            ->response()
            ->setStatusCode(201);
    }

    // GET /api/orders/track/{token}
    // Public endpoint — lets guests look up their order using the UUID token
    // returned when they placed it. No authentication required.
    public function trackByToken(string $token): OrderResource|JsonResponse
    {
        $order = $this->orderRepository->findByGuestToken($token);

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        return new OrderResource($order);
    }

    // PATCH /api/orders/{order}/status
    // Protected — updates order status (e.g. kitchen confirms, marks as ready).
    // In a production app, this would be restricted to admin/staff roles via Policy.
    public function updateStatus(UpdateOrderStatusRequest $request, Order $order): OrderResource
    {
        $updated = $this->orderRepository->updateStatus($order, $request->validated('status'));
        return new OrderResource($updated->load('orderItems'));
    }
}