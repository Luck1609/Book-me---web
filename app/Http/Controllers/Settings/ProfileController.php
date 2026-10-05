<?php

namespace App\Http\Controllers\Settings;

use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Http\Requests\Settings\StoreUserPhoneRequest;
use App\Http\Requests\Settings\VerifyUserPhoneRequest;
use App\Services\OtpService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

  public function index(Request $request)
  {
    $user = $request->user();

    if ($user->hasRole(UserTypeEnum::CLIENT->value))
      return redirect()->route('settings.profile.edit');

    return inertia('settings/index');
  }

  /**
   * Show the user's profile settings page.
   */
  public function edit(Request $request): Response
  {
    $user = $request->user();
    $phoneNumbers = $user->phoneNumbers->map(fn($phone) => [
      'id' => $phone->id,
      'phone' => $phone->phone,
      'verified_at' => $phone->verified_at?->toISOString(),
    ]);

    if ($user->phone !== null && ! $user->phoneNumbers->contains('phone', $user->phone)) {
      $phoneNumbers->prepend([
        'id' => null,
        'phone' => $user->phone,
        'verified_at' => $user->phone_verified_at?->toISOString(),
      ]);
    }

    return inertia('settings/profile', [
      'phoneNumbers' => $phoneNumbers->values(),
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => $request->session()->get('status'),
    ]);
  }

  public function storePhone(StoreUserPhoneRequest $request, OtpService $otpService): RedirectResponse
  {
    $phoneNumber = $request->user()->phoneNumbers()->create($request->validated());
    $otpService->request($phoneNumber->phone);

    return to_route('settings.profile.edit')->with('status', 'Phone number added. Check your messages for the verification code.');
  }

  public function verifyPhone(VerifyUserPhoneRequest $request, OtpService $otpService): RedirectResponse
  {
    $otpService->verifyUserPhone($request->user(), $request->validated('phone'), $request->validated('code'));

    return to_route('settings.profile.edit')->with('status', 'Phone number verified.');
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $user = $request->user();
    $data = $request->validated();

    $user->fill(Arr::except($data, ['avatar']));

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();

    if ($request->hasFile('avatar')) {
      $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
    }

    Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

    return to_route('settings.profile.edit');
  }

  /**
   * Delete the user's profile.
   */
  public function destroy(ProfileDeleteRequest $request): RedirectResponse
  {
    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
  }
}
