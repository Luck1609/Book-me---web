<?php

namespace App\Services;

use App\Contracts\SmsSender;
use App\Models\OtpChallenge;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OtpService
{
    public function __construct(private readonly SmsSender $smsSender) {}

    public function request(string $phone): void
    {
        $rateLimitKey = 'otp:'.$phone;

        if (RateLimiter::tooManyAttempts($rateLimitKey, 5)) {
            throw ValidationException::withMessages([
                'phone' => 'Too many verification attempts. Please try again later.',
            ]);
        }

        RateLimiter::hit($rateLimitKey, 900);

        $code = (string) random_int(100000, 999999);

        OtpChallenge::query()->create([
            'phone' => $phone,
            'code_hash' => Hash::make($code),
            'expires_at' => now()->addMinutes(10),
        ]);

        $this->smsSender->send($phone, "Your Book Me verification code is {$code}.");
    }

    public function verify(string $phone, string $code): User
    {
        return DB::transaction(function () use ($phone, $code): User {
            $challenge = OtpChallenge::query()
                ->where('phone', $phone)
                ->whereNull('verified_at')
                ->where('expires_at', '>', now())
                ->latest()
                ->lockForUpdate()
                ->first();

            if ($challenge === null || $challenge->attempts >= 5) {
                throw ValidationException::withMessages(['code' => 'The verification code is invalid or expired.']);
            }

            $challenge->increment('attempts');

            if (! Hash::check($code, $challenge->code_hash)) {
                throw ValidationException::withMessages(['code' => 'The verification code is invalid or expired.']);
            }

            $challenge->forceFill(['verified_at' => now()])->save();

            $user = User::query()->where('phone', $phone)->first();

            if ($user === null) {
                throw ValidationException::withMessages(['phone' => 'No account is registered with this phone number.']);
            }

            $user->forceFill(['phone_verified_at' => now()])->save();

            return $user;
        });
    }

    public function normalizePhone(string $phone): string
    {
        return Str::replaceMatches('/\s+/', '', trim($phone));
    }
}
