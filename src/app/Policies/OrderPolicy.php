<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    // Called before any other policy method.
    // If before() returns true, all other checks are bypassed.
    // Admins can always do everything — this prevents repeating
    // the admin check in every single method.
    public function before(User $user, string $ability): ?bool
    {
        if ($user->is_admin) {
            return true; // Admin bypasses all further checks
        }

        return null; // null means "continue to the specific method"
    }

    // Can this user view this order?
    // A user can view their own orders only.
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    // Can this user update the status of this order?
    // Only admins can update status — handled by before() above.
    // This method is effectively only reached by non-admins.
    public function updateStatus(User $user, Order $order): bool
    {
        return false;
    }

    // Can this user delete an order?
    public function delete(User $user, Order $order): bool
    {
        return false; // Only admins, handled by before()
    }
}