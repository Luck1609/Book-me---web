<?php

namespace App\Policies;

use App\Models\BusinessHour;
use App\Models\User;

class BusinessHourPolicy
{
    public function update(User $user, BusinessHour $businessHour): bool
    {
        return $businessHour->providerProfile?->user_id === $user->id;
    }
}
