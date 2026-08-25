<?php

namespace App\Policies;

use App\Models\AvailabilityBlock;
use App\Models\User;

class AvailabilityBlockPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('service_provider') && $user->providerProfile()->exists();
    }

    public function view(User $user, AvailabilityBlock $availabilityBlock): bool
    {
        return $availabilityBlock->providerProfile?->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AvailabilityBlock $availabilityBlock): bool
    {
        return false;
    }

    public function delete(User $user, AvailabilityBlock $availabilityBlock): bool
    {
        return $this->view($user, $availabilityBlock);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AvailabilityBlock $availabilityBlock): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AvailabilityBlock $availabilityBlock): bool
    {
        return false;
    }
}
