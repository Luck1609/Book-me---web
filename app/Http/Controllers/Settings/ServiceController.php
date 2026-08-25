<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ServiceRequest;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        abort_unless($request->user() instanceof User, 401);

        return Inertia::render('settings/services', [
            'services' => $request->user()->providerProfile()->firstOrFail()->services()->latest()->get()->map(
                fn (Service $service): array => $this->serviceData($service),
            ),
        ]);
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        abort_unless($request->user() instanceof User, 401);

        $data = $request->validated();
        $service = $request->user()->providerProfile()->firstOrFail()->services()->create([
            ...Arr::except($data, ['image', 'min_duration', 'max_duration']),
            'min_duration_minutes' => $data['min_duration'],
            'max_duration_minutes' => $data['max_duration'],
        ]);

        $this->attachImage($request, $service);

        return to_route('services.index');
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();
        $service->update([
            ...Arr::except($data, ['image', 'min_duration', 'max_duration']),
            'min_duration_minutes' => $data['min_duration'],
            'max_duration_minutes' => $data['max_duration'],
        ]);

        $this->attachImage($request, $service);

        return to_route('services.index');
    }

    public function destroy(ServiceRequest $request, Service $service): RedirectResponse
    {
        $service->delete();

        return to_route('services.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function serviceData(Service $service): array
    {
        return [
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'price' => $service->price,
            'min_duration' => $service->min_duration_minutes,
            'max_duration' => $service->max_duration_minutes,
            'is_active' => $service->is_active,
            'image' => $service->getFirstMediaUrl('image') ?: null,
        ];
    }

    private function attachImage(ServiceRequest $request, Service $service): void
    {
        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')->toMediaCollection('image');
        }
    }
}
