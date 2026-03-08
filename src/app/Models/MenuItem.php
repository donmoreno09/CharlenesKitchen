<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image_url',
        'cloudinary_public_id',
        'is_available',
    ];

    protected $casts = [
        // 'decimal:2' returns a string with exactly 2 decimal places.
        // This avoids floating point rounding issues when passing to JSON/API.
        'price'        => 'decimal:2',
        'is_available' => 'boolean',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    // Inverse of Category::menuItems()
    // $menuItem->category returns the full Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // ── Scopes ─────────────────────────────────────────────────────────────────

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }
}