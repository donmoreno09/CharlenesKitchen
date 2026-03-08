<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // ── Register ───────────────────────────────────────────────────────────────

    public function register(Request $request): JsonResponse
    {
        // validate() automatically returns a 422 JSON response if rules fail.
        // No try/catch needed — Laravel handles it via the exception handler.
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            // 'confirmed' rule requires a matching 'password_confirmation' field
        ]);

        $user = User::create($validated);

        // createToken() creates a Sanctum personal access token.
        // 'auth-token' is just a label — helpful for identifying tokens later.
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    // ── Login ──────────────────────────────────────────────────────────────────

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // Auth::attempt() checks credentials against the database.
        // It automatically hashes the password and compares.
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user  = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    // ── Logout ─────────────────────────────────────────────────────────────────

    public function logout(Request $request): JsonResponse
    {
        // currentAccessToken() returns the token used in this request.
        // delete() revokes it — it can never be used again.
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    // ── Current User ───────────────────────────────────────────────────────────

    public function me(Request $request): JsonResponse
    {
        // $request->user() returns the authenticated user from the token.
        return response()->json($request->user());
    }
}