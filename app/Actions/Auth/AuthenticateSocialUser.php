<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthenticateSocialUser
{
    /**
     * Find an existing social identity or create/link its user account.
     */
    public function execute(
        string $provider,
        string $providerId,
        string $name,
        ?string $email,
        ?string $avatar,
        bool $emailIsVerified = false,
    ): ?User {
        $user = User::where('social_platform', $provider)
            ->where('social_platform_id', $providerId)
            ->first();

        if ($user) {
            $user->update(['social_avatar' => $avatar]);

            return $user;
        }

        if (! $email) {
            return null;
        }

        $user = User::where('email', $email)->first();

        if ($user && ($user->social_platform_id || $user->social_platform) && (
            $user->social_platform !== $provider || $user->social_platform_id !== $providerId
        )) {
            throw ValidationException::withMessages([
                'email' => 'This email is already linked to another social account. Log in with that provider instead.',
            ]);
        }

        if (! $user) {
            $user = User::create([
                'name' => $name ?: 'Book Me user',
                'email' => $email,
                'social_platform' => $provider,
                'social_platform_id' => $providerId,
                'social_avatar' => $avatar,
            ]);

            if ($emailIsVerified) {
                $user->forceFill(['email_verified_at' => now()])->save();
            }

            return $user->refresh();
        }

        $attributes = [
            'social_platform' => $provider,
            'social_platform_id' => $providerId,
            'social_avatar' => $avatar,
        ];

        if ($emailIsVerified && ! $user->email_verified_at) {
            $attributes['email_verified_at'] = now();
        }

        $user->update($attributes);

        return $user->refresh();
    }
}
