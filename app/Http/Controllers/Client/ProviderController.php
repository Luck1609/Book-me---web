<?php

namespace App\Http\Controllers\Client;

use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\ProviderProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProviderController extends Controller
{
    public function index(Request $request): Response
    {
        $client = $this->clientFrom($request);
        $search = trim($request->string('search')->toString());
        $favoritesOnly = $request->boolean('favorites');
        $favoriteProviderIds = $client->favoriteProviders()->pluck('id');
        $providers = ProviderProfile::query()
            ->approved()
            ->where('is_accepting_bookings', true)
            ->when($favoritesOnly, fn (Builder $query) => $query->whereKey($favoriteProviderIds))
            ->with(['services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'price', 'min_duration_minutes', 'max_duration_minutes'])
                ->orderBy('sort_order')
                ->orderBy('name')])
            ->when($search !== '', function (Builder $query) use ($search): void {
                $term = "%{$search}%";
                $query->where(function (Builder $query) use ($term): void {
                    $query
                        ->whereRaw('LOWER(business_name) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(city) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(description) LIKE LOWER(?)', [$term])
                        ->orWhereHas('services', fn (Builder $serviceQuery) => $serviceQuery
                            ->where('is_active', true)
                            ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term]));
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (ProviderProfile $provider): array => $this->providerData($provider, $favoriteProviderIds->contains($provider->id)));

        return Inertia::render('client/providers/index', [
            'providers' => $providers,
            'filters' => ['search' => $search, 'favorites' => $favoritesOnly],
        ]);
    }

    public function show(Request $request, ProviderProfile $providerProfile): Response
    {
        $client = $this->clientFrom($request);
        abort_unless($providerProfile->status->value === 'approved' && $providerProfile->is_accepting_bookings, 404);

        $providerProfile->load([
            'services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'description', 'price', 'min_duration_minutes', 'max_duration_minutes', 'requires_payment'])
                ->orderBy('sort_order')
                ->orderBy('name'),
            'businessHours:id,provider_profile_id,day_of_week,is_closed,opens_at,closes_at',
        ]);

        return Inertia::render('client/providers/show', [
            'provider' => $this->providerData($providerProfile, $client->favoriteProviders()->whereKey($providerProfile->id)->exists()),
            'businessHours' => $providerProfile->businessHours->map(fn ($hour): array => [
                'day_of_week' => $hour->day_of_week,
                'is_closed' => $hour->is_closed,
                'opens_at' => $hour->opens_at,
                'closes_at' => $hour->closes_at,
            ])->values()->all(),
        ]);
    }

    /** @return array<string, mixed> */
    private function providerData(ProviderProfile $provider, bool $isFavorite = false): array
    {
        return [
            'id' => $provider->id,
            'slug' => $provider->slug,
            'business_name' => $provider->business_name,
            'description' => $provider->description,
            'phone' => $provider->phone,
            'email' => $provider->email,
            'address' => $provider->address,
            'city' => $provider->city,
            'avatar' => $provider->getFirstMediaUrl('avatar') ?: null,
            'is_favorite' => $isFavorite,
            'services' => $provider->services->map(fn ($service): array => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'price' => (float) $service->price,
                'min_duration_minutes' => $service->min_duration_minutes,
                'max_duration_minutes' => $service->max_duration_minutes,
                'requires_payment' => $service->requires_payment,
            ])->values()->all(),
        ];
    }

    private function clientFrom(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User && $user->hasRole(UserTypeEnum::CLIENT->value), 403);

        return $user;
    }
}
