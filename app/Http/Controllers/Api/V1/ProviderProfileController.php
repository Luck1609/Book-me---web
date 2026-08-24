<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Provider\StoreProviderProfileRequest;
use App\Http\Requests\Api\V1\Provider\UpdateProviderProfileRequest;
use App\Http\Resources\ProviderProfileResource;
use App\Models\ProviderProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ProviderProfileController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): AnonymousResourceCollection
  {
    return ProviderProfileResource::collection(
      ProviderProfile::query()->approved()->latest()->paginate(),
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProviderProfileRequest $request): JsonResponse
  {
    Gate::authorize('create', ProviderProfile::class);
    $profile = $request->user()->providerProfile()->create($request->validated());

    return response()->json(['data' => new ProviderProfileResource($profile), 'message' => 'Provider profile created successfully.'], 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(ProviderProfile $providerProfile): ProviderProfileResource
  {
    return new ProviderProfileResource($providerProfile->load('services'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateProviderProfileRequest $request, ProviderProfile $providerProfile): ProviderProfileResource
  {
    $providerProfile->update($request->validated());

    return new ProviderProfileResource($providerProfile->fresh());
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProviderProfile $providerProfile): JsonResponse
  {
    abort_unless($providerProfile->user_id === request()->user()->id, 403);

    return response()->json(status: 204);
  }
}
