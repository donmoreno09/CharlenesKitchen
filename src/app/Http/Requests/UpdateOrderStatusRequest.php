<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // 'in:' validates against a fixed list of allowed values.
            // This mirrors the enum values in the orders migration exactly.
            // If the enum ever changes, update both the migration and this rule.
            'status' => 'required|string|in:pending,confirmed,preparing,ready,delivered,cancelled',
        ];
    }

    public function messages(): array
    {
        return [
            'status.in' => 'Invalid order status.',
        ];
    }
}