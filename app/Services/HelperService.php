<?php

namespace App\Services;

use App\Models\ProviderProfile;

class HelperService
{
  public static function getBusinessHours(ProviderProfile $provider): array
  {
    return $provider->businessHours->map(
      fn($hour): array => [
        'day_of_week' => $hour->day_of_week,
        'is_closed' => $hour->is_closed,
        'opens_at' => $hour->opens_at,
        'closes_at' => $hour->closes_at
      ]
    )->values()->all();
  }
}
