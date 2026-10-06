<?php

namespace App\Services;

use App\Models\Category;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\User;

class BusinessProfileService
{
    public function businessHours(User $user)
    {
        $providerProfile = $user->providerProfile()->firstOrFail();
        $today = now()->startOfDay();

        return [
            'businessHours' => $providerProfile->businessHours()
                ->orderBy('day_of_week')
                ->get(['id', 'day_of_week', 'is_closed', 'opens_at', 'closes_at']),
            'blocks' => $providerProfile->availabilityBlocks()
                ->where('ends_at', '>=', $today)
                ->orderBy('starts_at')
                ->get(['id', 'starts_at', 'ends_at', 'type', 'reason']),
            'bookings' => $providerProfile->bookings()
                ->with([
                    'user:id,name',
                    'service:id,name',
                ])
                ->whereBetween('schedule', [$today, $today->copy()->addDays(30)->endOfDay()])
                ->orderBy('schedule')
                ->get(['id', 'user_id', 'service_id', 'schedule']),
        ];
    }

    public function businessDetails(User $user)
    {
        $providerProfile = $user->providerProfile()->firstOrFail();

        return [
            'providerProfile' => $this->getProviderProfile($providerProfile),
            'categories' => Category::select(['id', 'name'])
                ->orderBy('name')
                ->get()
                ->map(fn (Category $category): array => [
                    'label' => $category->name,
                    'value' => $category->id,
                ]),
        ];
    }

    public function businessAvailability(User $user)
    {
        $providerProfile = $user->providerProfile()->firstOrFail();

        return [
            'providerProfile' => $this->getProviderProfile($providerProfile),
            'regions' => self::getRegions(),
        ];
    }

    public static function getProviderProfile(ProviderProfile $profile)
    {
        return $profile->only([
            'id',
            'business_name',
            'slug',
            'description',
            'phone',
            'email',
            'address',
            'city',
            'region_id',
            'district_id',
            'category_id',
            'latitude',
            'longitude',
            'is_accepting_bookings',
        ]);
    }

    public static function getRegions()
    {
        return Region::with(['districts:id,name,region_id'])
            ->select(['id', 'name'])
            ->orderBy('name')
            ->get()
            ->map(fn (Region $region): array => [
                'label' => $region->name,
                'value' => $region->id,
                'districts' => $region->districts->map(fn ($district): array => [
                    'label' => $district->name,
                    'value' => $district->id,
                ])->values(),
            ]);
    }
}
