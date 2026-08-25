<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvailabilityBlockRequest;
use App\Models\AvailabilityBlock;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class AvailabilityBlockController extends Controller
{
    public function store(StoreAvailabilityBlockRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('create', AvailabilityBlock::class);

        $user->providerProfile()->firstOrFail()->availabilityBlocks()->create($request->validated());

        return back()->with('success', 'Time block added successfully.');
    }

    public function destroy(AvailabilityBlock $availabilityBlock): RedirectResponse
    {
        Gate::authorize('delete', $availabilityBlock);
        $availabilityBlock->delete();

        return back()->with('success', 'Time block removed successfully.');
    }
}
