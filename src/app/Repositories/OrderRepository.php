<?php

namespace App\Repositories;

use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;

class OrderRepository implements OrderRepositoryInterface
{
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    public function findById(int $id): ?Order
    {
        return Order::with('orderItems')->find($id);
    }

    public function findByGuestToken(string $token): ?Order
    {
        return Order::with('orderItems')
                    ->where('guest_token', $token)
                    ->first();
    }

    public function findByUser(int $userId): Collection
    {
        return Order::with('orderItems')
                    ->where('user_id', $userId)
                    ->latest()  // ordered by created_at DESC
                    ->get();
    }

    public function updateStatus(Order $order, string $status): Order
    {
        $order->update(['status' => $status]);
        return $order->fresh();
    }
}