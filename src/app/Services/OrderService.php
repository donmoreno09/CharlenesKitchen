<?php

namespace App\Services;

use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Models\MenuItem;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderService
{
    // Dependencies injected via constructor — this is the Service Container at work.
    // OrderService doesn't create its own repository or email service.
    // Laravel injects the registered implementations automatically.
    public function __construct(
        private OrderRepositoryInterface $orderRepository,
        private EmailService $emailService,
    ) {}

    // ── Place Order ────────────────────────────────────────────────────────────

    // $orderData  = [ customer_name, customer_email, notes, user_id (optional) ]
    // $cartItems  = [ ['menu_item_id' => 1, 'quantity' => 2], ... ]
    public function placeOrder(array $orderData, array $cartItems): Order
    {
        // DB::transaction() wraps everything in a database transaction.
        // If anything inside throws an exception, ALL changes are rolled back.
        // This guarantees we never have an order without order items, or vice versa.
        return DB::transaction(function () use ($orderData, $cartItems) {

            // 1. Calculate total from actual menu item prices
            //    Never trust prices sent from the frontend — always recalculate server-side
            $total      = 0;
            $itemsToCreate = [];

            foreach ($cartItems as $cartItem) {
                $menuItem = MenuItem::findOrFail($cartItem['menu_item_id']);
                $quantity = (int) $cartItem['quantity'];
                $subtotal = $menuItem->price * $quantity;
                $total   += $subtotal;

                // Build the order item data with price snapshot
                $itemsToCreate[] = [
                    'menu_item_id'   => $menuItem->id,
                    'menu_item_name' => $menuItem->name,   // snapshot
                    'unit_price'     => $menuItem->price,  // snapshot
                    'quantity'       => $quantity,
                ];
            }

            // 2. Create the order record
            $order = $this->orderRepository->create([
                ...$orderData,
                'total_price' => $total,
                'status'      => 'pending',
            ]);

            // 3. Create all order items linked to this order
            $order->orderItems()->createMany($itemsToCreate);

            // 4. Send confirmation email (failure is caught inside the service)
            $this->emailService->sendOrderConfirmation($order);

            return $order->load('orderItems');
        });
    }
}