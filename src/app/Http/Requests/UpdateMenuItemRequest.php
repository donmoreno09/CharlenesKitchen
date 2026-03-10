<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // 'sometimes' means: only validate this field IF it's present in the request.
            // This is what makes PATCH semantics work — partial updates.
            // A PUT request would omit 'sometimes' and require all fields.
            'category_id'  => 'sometimes|integer|exists:categories,id',
            'name'         => 'sometimes|string|max:255',
            'description'  => 'nullable|string|max:1000',
            'price'        => 'sometimes|numeric|min:0',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_available' => 'sometimes|boolean',
        ];
    }
}