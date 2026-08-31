<?php

namespace App\Http\Controllers\Client;

use App\Enums\ProviderStatus;
use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\ProviderProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(Request $request): Response
    {
        $client = $this->clientFrom($request);
        $favorites = $client->favoriteProviders()
            ->approved()
            ->where('is_accepting_bookings', true)
            ->with(['services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'price', 'min_duration_minutes', 'max_duration_minutes'])
                ->orderBy('sort_order')
                ->orderBy('name')])
            ->orderByPivot('created_at', 'desc')
            ->get()
            ->map(fn (ProviderProfile $provider): array => [
                'id' => $provider->id,
                'slug' => $provider->slug,
                'business_name' => $provider->business_name,
                'description' => $provider->description,
                'city' => $provider->city,
                'avatar' => $provider->getFirstMediaUrl('avatar') ?: null,
                'is_favorite' => true,
                'services' => $provider->services->map(fn ($service): array => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'price' => (float) $service->price,
                    'min_duration_minutes' => $service->min_duration_minutes,
                    'max_duration_minutes' => $service->max_duration_minutes,
                ])->values()->all(),
            ])
            ->values()
            ->all();

        return inertia('client/favorite', ['data' => $favorites]);
    }

    public function store(Request $request, ProviderProfile $providerProfile): RedirectResponse
    {
        $client = $this->clientFrom($request);
        $this->ensureDiscoverable($providerProfile);

        $client->favoriteProviders()->syncWithoutDetaching([$providerProfile->id]);

        return back();
    }

    public function destroy(Request $request, ProviderProfile $providerProfile): RedirectResponse
    {
        $client = $this->clientFrom($request);

        $client->favoriteProviders()->detach($providerProfile->id);

        return back();
    }

    private function clientFrom(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User && $user->hasRole(UserTypeEnum::CLIENT->value), 403);

        return $user;
    }

    private function ensureDiscoverable(ProviderProfile $providerProfile): void
    {
        abort_unless($providerProfile->status === ProviderStatus::Approved && $providerProfile->is_accepting_bookings, 404);
    }
}
