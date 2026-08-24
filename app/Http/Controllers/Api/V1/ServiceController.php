<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Provider\StoreServiceRequest;
use App\Http\Requests\Api\V1\Provider\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Service::class);

        return ServiceResource::collection(
            request()->user()->providerProfile->services()->latest()->paginate(),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        Gate::authorize('create', Service::class);
        $data = $request->validated();
        $durationMinutes = $data['duration_minutes'];
        unset($data['duration_minutes']);

        $service = $request->user()->providerProfile->services()->create([
            ...$data,
            'min_duration_minutes' => $durationMinutes,
            'max_duration_minutes' => $durationMinutes,
        ]);

        return response()->json(['data' => new ServiceResource($service), 'message' => 'Service created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): ServiceResource
    {
        Gate::authorize('view', $service);

        return new ServiceResource($service);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service): ServiceResource
    {
        Gate::authorize('update', $service);
        $data = $request->validated();

        if (array_key_exists('duration_minutes', $data)) {
            $durationMinutes = $data['duration_minutes'];
            unset($data['duration_minutes']);
            $data['min_duration_minutes'] = $durationMinutes;
            $data['max_duration_minutes'] = $durationMinutes;
        }

        $service->update($data);

        return new ServiceResource($service->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service): JsonResponse
    {
        Gate::authorize('delete', $service);
        $service->delete();

        return response()->json(status: 204);
    }
}
