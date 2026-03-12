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

Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('menu-items', MenuItemController::class)->only(['index', 'show']);

// Public — guests and authenticated users can both place orders
Route::post('orders', [OrderController::class, 'store']);

// Public — guest order tracking via UUID token
Route::get('orders/track/{token}', [OrderController::class, 'trackByToken']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::apiResource('orders', OrderController::class)->only(['index', 'show']);
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