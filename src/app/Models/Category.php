<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    // $fillable defines which columns can be mass-assigned.
    // Mass assignment means passing an array to create() or fill().
    // Without this, Laravel throws a MassAssignmentException as a security guard.
    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'is_active',
    ];

    // $casts automatically converts raw database values to proper PHP types.
    // Without this, is_active would come back as the string "1" or "0".
    protected $casts = [
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    // A category has many menu items.
    // This lets us do: $category->menuItems or $category->menuItems()->where(...)
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }

    // ── Local Scopes ───────────────────────────────────────────────────────────

    // Local scopes add reusable query constraints chainable like:
    // Category::active()->ordered()->get()
    //
    // Without scopes you'd write:
    // Category::where('is_active', true)->orderBy('sort_order')->get()
    // With scopes it's readable, reusable, and self-documenting.

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}