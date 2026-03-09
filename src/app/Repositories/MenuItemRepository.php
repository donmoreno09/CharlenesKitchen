<?php

namespace App\Repositories;

use App\Contracts\Repositories\MenuItemRepositoryInterface;
use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Collection;

class MenuItemRepository implements MenuItemRepositoryInterface
{
    // All database queries for menu items live here.
    // Controllers and services never write Eloquent queries directly.

    public function getAllAvailable(): Collection
    {
        // eager load category to avoid N+1 query problem
        return MenuItem::with('category')
                    ->available()
                    ->orderBy('name')
                    ->get();
    }

    public function findById(int $id): ?MenuItem
    {
        // find() returns null if not found — we return ?MenuItem (nullable)
        return MenuItem::with('category')->find($id);
    }

    public function findByCategory(int $categoryId): Collection
    {
        return MenuItem::with('category')
                    ->available()
                    ->where('category_id', $categoryId)
                    ->orderBy('name')
                    ->get();
    }

    public function create(array $data): MenuItem
    {
        return MenuItem::create($data);
    }

    public function update(MenuItem $menuItem, array $data): MenuItem
    {
        $menuItem->update($data);
        // fresh() refetches the model from DB — returns updated state
        return $menuItem->fresh();
    }

    public function delete(MenuItem $menuItem): void
    {
        $menuItem->delete();
    }
}