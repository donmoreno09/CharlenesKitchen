<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // HasApiTokens adds token management methods to the User model:
    // $user->createToken(), $user->tokens(), $user->currentAccessToken()
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
        'is_admin'          => 'boolean',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    // A user can have many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}