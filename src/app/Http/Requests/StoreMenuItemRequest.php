<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuItemRequest extends FormRequest
{
    // authorize() decides if the current user is allowed to make this request.
    // Returning true here means "allow all" — we'll enforce role checks
    // via Policies in Step 6. For now, the auth:sanctum middleware
    // already ensures only logged-in users reach these endpoints.
    public function authorize(): bool
    {
        return true;
    }

    // rules() returns the validation ruleset for this specific request.
    // Laravel runs these rules automatically before the controller method executes.
    // If any rule fails, a 422 response with error details is returned immediately.
    public function rules(): array
    {
        return [
            'category_id'  => 'required|integer|exists:categories,id',
            // exists:categories,id checks the value actually exists in the DB
            // This prevents orphaned menu items with invalid foreign keys.

            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string|max:1000',

            // numeric|min:0 ensures no negative prices
            'price'        => 'required|numeric|min:0',

            // image is optional at creation — can be added/changed later
            // mimes restricts to image formats; max:2048 = 2MB limit
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',

            'is_available' => 'boolean',
        ];
    }

    // messages() overrides default error messages with friendlier, context-aware text.
    // Default: "The category id field is required."
    // Custom: "Please select a category."
    public function messages(): array
    {
        return [
            'category_id.required' => 'Please select a category.',
            'category_id.exists'   => 'The selected category does not exist.',
            'price.min'            => 'Price cannot be negative.',
            'image.max'            => 'Image must be smaller than 2MB.',
        ];
    }
}