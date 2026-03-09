<?php

namespace App\Services;

use App\Mail\OrderConfirmationMail;
use App\Mail\WelcomeMail;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EmailService
{
    // ── Order Confirmation ─────────────────────────────────────────────────────

    // Called after any order is placed — guest or authenticated.
    // We use the customer_email stored on the order (not user profile)
    // so guest orders work identically to authenticated ones.
    public function sendOrderConfirmation(Order $order): void
    {
        try {
            Mail::to($order->customer_email)
                ->send(new OrderConfirmationMail($order));
        } catch (\Exception $e) {
            // We catch and log email failures instead of letting them
            // bubble up and break the order placement flow.
            // A failed email should never prevent an order from being saved.
            Log::error('Order confirmation email failed', [
                'order_id' => $order->id,
                'email'    => $order->customer_email,
                'error'    => $e->getMessage(),
            ]);
        }
    }

    // ── Welcome Email ──────────────────────────────────────────────────────────

    public function sendWelcome(User $user): void
    {
        try {
            Mail::to($user->email)->send(new WelcomeMail($user));
        } catch (\Exception $e) {
            Log::error('Welcome email failed', [
                'user_id' => $user->id,
                'email'   => $user->email,
                'error'   => $e->getMessage(),
            ]);
        }
    }
}