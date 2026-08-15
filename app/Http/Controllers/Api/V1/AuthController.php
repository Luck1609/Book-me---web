<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Requests\Api\V1\Auth\RequestOtpRequest;
use App\Http\Requests\Api\V1\Auth\VerifyOtpRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, OtpService $otpService): JsonResponse
    {
        $data = $request->validated();
        $user = User::query()->create([
            'name' => $data['name'],
            'email' => isset($data['email']) ? Str::lower($data['email']) : null,
            'phone' => $data['phone'] ?? null,
            'password' => $data['password'] ?? null,
        ]);
        $user->assignRole(Role::findOrCreate($data['account_type'], 'web'));

        $verificationRequired = false;

        if ($user->phone !== null) {
            $otpService->request($user->phone);
            $verificationRequired = true;
        }

        return response()->json([
            'data' => ['user' => $user, 'verification_required' => $verificationRequired],
            'message' => 'Account created successfully.',
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $identifier = trim($request->string('identifier')->toString());
        $column = str_contains($identifier, '@') ? 'email' : 'phone';
        $identifier = $column === 'email' ? Str::lower($identifier) : $identifier;
        $user = User::query()->where($column, $identifier)->first();

        abort_unless(
            $user !== null
                && $user->is_active
                && is_string($user->password)
                && Hash::check($request->string('password')->toString(), $user->password),
            422,
            'Invalid credentials.',
        );
        abort_if($column === 'phone' && $user->phone_verified_at === null, 403, 'Verify your phone number before signing in.');

        return $this->tokenResponse($user, 'Logged in successfully.');
    }

    public function requestOtp(RequestOtpRequest $request, OtpService $otpService): JsonResponse
    {
        $phone = $otpService->normalizePhone($request->string('phone')->toString());

        if (User::query()->where('phone', $phone)->exists()) {
            $otpService->request($phone);
        }

        return response()->json(['message' => 'If the phone number is eligible, a verification code has been sent.']);
    }

    public function verifyOtp(VerifyOtpRequest $request, OtpService $otpService): JsonResponse
    {
        $phone = $otpService->normalizePhone($request->string('phone')->toString());
        $user = $otpService->verify($phone, $request->string('code')->toString());

        return $this->tokenResponse($user, 'Phone verified successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    private function tokenResponse(User $user, string $message): JsonResponse
    {
        return response()->json([
            'data' => ['user' => $user, 'token' => $user->createToken('api')->plainTextToken],
            'message' => $message,
        ]);
    }
}
