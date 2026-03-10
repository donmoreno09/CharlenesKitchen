<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'description'  => $this->description,

            // Cast ensures price is always returned as a float (e.g. 13.99),
            // never as a string "13.99" — consistent type for the frontend.
            'price'        => (float) $this->price,

            'image_url'    => $this->image_url,
            'is_available' => $this->is_available,

            // Note: cloudinary_public_id is intentionally excluded.
            // It's an internal implementation detail — the frontend never needs it.

            // Include the category only when loaded
            'category'     => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}