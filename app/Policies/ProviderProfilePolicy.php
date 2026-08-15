<?php

namespace App\Policies;

use App\Models\ProviderProfile;
use App\Models\User;

class ProviderProfilePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('service_provider');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ProviderProfile $providerProfile): bool
    {
        return $providerProfile->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('service_provider') && ! $user->providerProfile()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ProviderProfile $providerProfile): bool
    {
        return $providerProfile->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ProviderProfile $providerProfile): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ProviderProfile $providerProfile): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ProviderProfile $providerProfile): bool
    {
        return false;
    }
}
