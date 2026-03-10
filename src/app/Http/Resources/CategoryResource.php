<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    // toArray() defines exactly which fields are included in the JSON response.
    // $this->resource refers to the underlying Category model instance.
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'slug'       => $this->slug,
            'sort_order' => $this->sort_order,
            'is_active'  => $this->is_active,

            // whenLoaded() only includes menu_items in the response
            // if the relationship was eager loaded with with('menuItems').
            // This prevents accidental N+1 queries triggered by the resource itself.
            'menu_items' => MenuItemResource::collection(
                $this->whenLoaded('menuItems')
            ),
        ];
    }
}