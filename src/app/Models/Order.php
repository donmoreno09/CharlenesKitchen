<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'guest_token',
        'customer_name',
        'customer_email',
        'customer_phone',
        'status',
        'total_price',
        'notes',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    // ── Model Boot Hook ────────────────────────────────────────────────────────

    // boot() runs once when the model class is first loaded.
    // We use Eloquent's "creating" event to hook into the moment just before
    // a new Order record is inserted into the database.
    //
    // If the order has no user_id (guest) and no token yet, we generate one.
    // This is automatic — no controller needs to remember to do it.
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Order $order) {
            if (empty($order->user_id) && empty($order->guest_token)) {
                // Str::uuid() generates a RFC 4122 v4 UUID.
                // Example: "550e8400-e29b-41d4-a716-446655440000"
                // Cryptographically random — practically impossible to guess.
                $order->guest_token = (string) Str::uuid();
            }
        });
    }

    // ── Relationships ──────────────────────────────────────────────────────────

    // Returns null for guest orders — always check isGuest() before accessing
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // ── Helper Methods ─────────────────────────────────────────────────────────

    // Readable boolean check — use this throughout the codebase instead of
    // checking is_null($order->user_id) everywhere
    public function isGuest(): bool
    {
        return is_null($this->user_id);
    }
}