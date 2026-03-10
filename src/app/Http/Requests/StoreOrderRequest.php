<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    // Orders can be placed by guests — so we allow all requests.
    // The controller will determine if the user is authenticated or not.
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name'  => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'notes'          => 'nullable|string|max:500',

            // cart_items must be an array with at least one item.
            // 'array' validates the field is an array.
            // 'min:1' ensures at least one item is present.
            'cart_items'          => 'required|array|min:1',

            // Dot notation validates each element INSIDE the array.
            // 'cart_items.*.menu_item_id' = "for every element in cart_items,
            //  validate the menu_item_id field"
            'cart_items.*.menu_item_id' => 'required|integer|exists:menu_items,id',
            'cart_items.*.quantity'     => 'required|integer|min:1|max:99',
        ];
    }

    public function messages(): array
    {
        return [
            'cart_items.required'               => 'Your cart is empty.',
            'cart_items.min'                    => 'Your cart must have at least one item.',
            'cart_items.*.menu_item_id.exists'  => 'One or more items in your cart are no longer available.',
            'cart_items.*.quantity.min'         => 'Quantity must be at least 1.',
        ];
    }
}