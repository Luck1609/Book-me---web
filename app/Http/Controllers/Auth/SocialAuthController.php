<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\AuthenticateSocialUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CompleteSocialSignupRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class SocialAuthController extends Controller
{
    private const PENDING_SESSION_KEY = 'social_auth.pending';

    /**
     * @var array<string, string>
     */
    private const PROVIDER_LABELS = [
        'google' => 'Google',
        'facebook' => 'Facebook',
        'tiktok' => 'TikTok',
    ];

    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($this->validatedProvider($provider))->redirect();
    }

    public function callback(
        Request $request,
        string $provider,
        AuthenticateSocialUser $authenticateSocialUser,
    ): RedirectResponse {
        $provider = $this->validatedProvider($provider);
        $socialUser = Socialite::driver($provider)->user();
        
        $socialUserData = [
            'provider' => $provider,
            'provider_id' => (string) $socialUser->getId(),
            'name' => (string) ($socialUser->getName() ?: $socialUser->getNickname() ?: 'Book Me user'),
            'avatar' => $socialUser->getAvatar(),
        ];

        try {
            $user = $authenticateSocialUser->execute(
                provider: $socialUserData['provider'],
                providerId: $socialUserData['provider_id'],
                name: $socialUserData['name'],
                email: $socialUser->getEmail(),
                avatar: $socialUserData['avatar'],
                emailIsVerified: (bool) $socialUser->getEmail(),
            );
        } catch (ValidationException $exception) {
            return redirect()->route('login')->with('status', $exception->errors()['email'][0]);
        }

        if (! $user) {
            $request->session()->put(self::PENDING_SESSION_KEY, $socialUserData);

            return redirect()->route('auth.social.email.create');
        }

        $this->login($request, $user);

        return redirect()->intended(config('fortify.home'));
    }

    public function emailForm(Request $request): Response|RedirectResponse
    {
        $pending = $request->session()->get(self::PENDING_SESSION_KEY);

        if (! is_array($pending) || ! isset($pending['provider'])) {
            return redirect()->route('login');
        }

        return Inertia::render('auth/social-email', [
            'provider' => self::PROVIDER_LABELS[$pending['provider']] ?? 'social account',
        ]);
    }

    public function completeEmail(
        CompleteSocialSignupRequest $request,
        AuthenticateSocialUser $authenticateSocialUser,
    ): RedirectResponse {
        /** @var array{provider: string, provider_id: string, name: string, avatar: string|null}|null $pending */
        $pending = $request->session()->get(self::PENDING_SESSION_KEY);

        if (! is_array($pending) || ! isset($pending['provider'], $pending['provider_id'], $pending['name'])) {
            return redirect()->route('login')->with('status', 'Your social sign-up session expired. Please try again.');
        }

        try {
            $user = $authenticateSocialUser->execute(
                provider: $pending['provider'],
                providerId: $pending['provider_id'],
                name: $pending['name'],
                email: $request->validated('email'),
                avatar: $pending['avatar'],
            );
        } catch (ValidationException $exception) {
            return back()->withErrors($exception->errors())->withInput();
        }

        if (! $user) {
            return redirect()->route('login')->with('status', 'We could not complete your social sign-up. Please try again.');
        }

        $request->session()->forget(self::PENDING_SESSION_KEY);
        $this->login($request, $user);

        return redirect()->intended(config('fortify.home'));
    }

    private function validatedProvider(string $provider): string
    {
        abort_unless(array_key_exists($provider, self::PROVIDER_LABELS), SymfonyResponse::HTTP_NOT_FOUND);

        return $provider;
    }

    private function login(Request $request, User $user): void
    {
        Auth::guard('web')->login($user, remember: true);
        $request->session()->regenerate();
    }
}
