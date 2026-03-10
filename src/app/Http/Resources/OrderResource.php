<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'status'         => $this->status,
            'total_price'    => (float) $this->total_price,
            'customer_name'  => $this->customer_name,
            'customer_email' => $this->customer_email,
            'customer_phone' => $this->customer_phone,
            'notes'          => $this->notes,

            // guest_token is exposed so guests can track their order.
            // For authenticated users this will be null — that's fine.
            'guest_token'    => $this->guest_token,

            'created_at'     => $this->created_at->toISOString(),

            // Nest order items inline using OrderItemResource
            'order_items'    => OrderItemResource::collection(
                $this->whenLoaded('orderItems')
            ),
        ];
    }
}