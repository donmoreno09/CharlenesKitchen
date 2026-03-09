<?php

namespace App\Contracts\Repositories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;

interface OrderRepositoryInterface
{
    public function create(array $data): Order;
    public function findById(int $id): ?Order;
    public function findByGuestToken(string $token): ?Order;
    public function findByUser(int $userId): Collection;
    public function updateStatus(Order $order, string $status): Order;
}