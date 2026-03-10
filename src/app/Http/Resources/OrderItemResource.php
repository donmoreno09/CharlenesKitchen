<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'menu_item_id'   => $this->menu_item_id,

            // These are the snapshot fields — the name and price at order time.
            // Even if the menu item is later deleted, this data is permanent.
            'menu_item_name' => $this->menu_item_name,
            'unit_price'     => (float) $this->unit_price,
            'quantity'       => $this->quantity,

            // subtotal is the accessor defined in the OrderItem model (qty × price).
            // It's not a database column but it's useful for the frontend to display.
            'subtotal'       => (float) $this->subtotal,
        ];
    }
}