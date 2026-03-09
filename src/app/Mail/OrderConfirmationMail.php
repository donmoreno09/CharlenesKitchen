<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    // The Order model is injected via the constructor.
    // SerializesModels handles serializing/deserializing it if queued.
    public function __construct(public Order $order)
    {
    }

    // Envelope defines the email's outer properties — subject, from, to
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Order Confirmed — #{$this->order->id} | Charlene's Kitchen",
        );
    }

    // Content defines what's inside the email
    public function content(): Content
    {
        return new Content(
            // We'll create this Blade view in Phase 5
            view: 'emails.order-confirmation',
        );
    }
}