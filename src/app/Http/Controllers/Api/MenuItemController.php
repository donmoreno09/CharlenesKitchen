<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\MenuItemRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Http\Requests\UpdateMenuItemRequest;
use App\Http\Resources\MenuItemResource;
use App\Models\MenuItem;
use App\Services\CloudinaryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MenuItemController extends Controller
{
    // Dependencies are injected by Laravel's Service Container.
    // The controller declares what it needs; the container provides it.
    // No 'new' keyword — no tight coupling.
    public function __construct(
        private MenuItemRepositoryInterface $menuItemRepository,
        private CloudinaryService $cloudinaryService,
    ) {}

    // GET /api/menu-items
    // Public endpoint — lists all available menu items with their categories.
    public function index(): AnonymousResourceCollection
    {
        $items = $this->menuItemRepository->getAllAvailable();
        return MenuItemResource::collection($items);
    }

    // GET /api/menu-items/{menuItem}
    // Public endpoint — returns a single menu item.
    public function show(MenuItem $menuItem): MenuItemResource
    {
        $menuItem->load('category');
        return new MenuItemResource($menuItem);
    }

    // POST /api/menu-items
    // Protected — requires authentication.
    // StoreMenuItemRequest handles validation before this method runs.
    public function store(StoreMenuItemRequest $request): JsonResponse
    {
        // validated() returns only the fields that passed validation rules.
        // This is safer than $request->all() which would include any extra
        // fields a malicious user might inject into the request body.
        $data = $request->validated();

        // Handle image upload if a file was provided
        if ($request->hasFile('image')) {
            // Delegate to CloudinaryService — the controller doesn't know
            // or care about Cloudinary's API. It just calls the wrapper.
            $uploaded = $this->cloudinaryService->uploadImage($request->file('image'));

            $data['image_url']            = $uploaded['url'];
            $data['cloudinary_public_id'] = $uploaded['public_id'];
        }

        $menuItem = $this->menuItemRepository->create($data);

        // 201 Created — the standard HTTP status for a successfully created resource.
        return (new MenuItemResource($menuItem->load('category')))
            ->response()
            ->setStatusCode(201);
    }

    // PATCH /api/menu-items/{menuItem}
    // Protected — requires authentication.
    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem): MenuItemResource
    {
        $data = $request->validated();

        // If a new image is uploaded, delete the old one from Cloudinary first
        // to avoid orphaned assets accumulating in the account.
        if ($request->hasFile('image')) {
            // Only delete the old image if one exists
            if ($menuItem->cloudinary_public_id) {
                $this->cloudinaryService->deleteImage($menuItem->cloudinary_public_id);
            }

            $uploaded = $this->cloudinaryService->uploadImage($request->file('image'));

            $data['image_url']            = $uploaded['url'];
            $data['cloudinary_public_id'] = $uploaded['public_id'];
        }

        $updated = $this->menuItemRepository->update($menuItem, $data);

        return new MenuItemResource($updated->load('category'));
    }

    // DELETE /api/menu-items/{menuItem}
    // Protected — requires authentication.
    public function destroy(MenuItem $menuItem): JsonResponse
    {
        // Clean up the Cloudinary asset before deleting the database record.
        // If we deleted the DB record first and then Cloudinary failed,
        // we'd have an orphaned asset with no way to reference it.
        if ($menuItem->cloudinary_public_id) {
            $this->cloudinaryService->deleteImage($menuItem->cloudinary_public_id);
        }

        $this->menuItemRepository->delete($menuItem);

        // 204 No Content — success with no response body.
        // Standard for DELETE operations.
        return response()->json(null, 204);
    }
}