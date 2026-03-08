<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// ── Public Auth Routes ─────────────────────────────────────────────────────
// No authentication required to register or log in
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ── Protected Routes ───────────────────────────────────────────────────────
// 'auth:sanctum' middleware validates the Bearer token on every request.
// Requests without a valid token receive a 401 Unauthorized response.
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);
});