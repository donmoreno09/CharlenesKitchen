<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // EmailService injected for sending the welcome email on registration.
    public function __construct(private EmailService $emailService) {}

    // POST /api/register
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user  = User::create($validated);
        $token = $user->createToken('auth-token')->plainTextToken;

        // Fire the welcome email after account creation.
        // EmailService catches and logs failures internally —
        // a failed email will never prevent the registration from succeeding.
        $this->emailService->sendWelcome($user);

        return response()->json([
            // UserResource ensures consistent field shaping — same as /api/me
            'user'  => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    // POST /api/login
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user  = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $token,
        ]);
    }

    // POST /api/logout
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully.']);
    }

    // GET /api/me
    public function me(Request $request): UserResource
    {
        // Returning a Resource directly — Laravel handles the JSON wrapping.
        return new UserResource($request->user());
    }
}