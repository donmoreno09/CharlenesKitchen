<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

// ── Public Routes ──────────────────────────────────────────────────────────────
// No authentication needed — anyone can browse the menu

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// apiResource() generates all 5 RESTful routes automatically:
// GET    /categories         → index
// GET    /categories/{id}    → show
// POST   /categories         → store
// PATCH  /categories/{id}    → update
// DELETE /categories/{id}    → destroy
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('menu-items', MenuItemController::class)->only(['index', 'show']);

// ── Protected Routes ───────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Orders 
    Route::apiResource('orders', OrderController::class)->only(['index', 'show', 'store']);
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);

    // 'can:manage-menu' middleware checks the Gate before the controller runs.
    // Non-admin users receive a 403 before the controller is even invoked.
    Route::middleware('can:manage-menu')->group(function () {
        Route::apiResource('menu-items', MenuItemController::class)
            ->only(['store', 'update', 'destroy']);
        Route::apiResource('categories', CategoryController::class)
            ->only(['store', 'update', 'destroy']);
    });
});

// Guest order lookup by token — public but token-gated
Route::get('orders/track/{token}', [OrderController::class, 'trackByToken']);