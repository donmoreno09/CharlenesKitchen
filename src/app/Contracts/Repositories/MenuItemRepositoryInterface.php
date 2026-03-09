<?php

namespace App\Contracts\Repositories;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Collection;

interface MenuItemRepositoryInterface
{
    public function getAllAvailable(): Collection;
    public function findById(int $id): ?MenuItem;
    public function findByCategory(int $categoryId): Collection;
    public function create(array $data): MenuItem;
    public function update(MenuItem $menuItem, array $data): MenuItem;
    public function delete(MenuItem $menuItem): void;
}