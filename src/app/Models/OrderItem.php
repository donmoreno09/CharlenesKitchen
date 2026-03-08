<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'menu_item_id',
        'menu_item_name',
        'quantity',
        'unit_price',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'quantity'   => 'integer',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // nullable relationship — the menu item may have been deleted
    // Always check: if ($orderItem->menuItem) { ... }
    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }

    // ── Computed Attributes ────────────────────────────────────────────────────

    // An accessor computes a value on the fly without storing it in the database.
    // Accessible as $orderItem->subtotal — looks like a real column but isn't.
    // The naming convention getXxxAttribute() maps to $model->xxx.
    public function getSubtotalAttribute(): float
    {
        return $this->quantity * $this->unit_price;
    }
}