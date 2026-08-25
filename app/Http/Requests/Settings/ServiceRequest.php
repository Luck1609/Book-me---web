<?php

namespace App\Http\Requests\Settings;

use App\Models\Service;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        $service = $this->route('service');

        if (! $user instanceof User || ! $user->hasRole('service_provider')) {
            return false;
        }

        return $service instanceof Service
            ? $service->provider_profile_id === $user->providerProfile?->id
            : $user->providerProfile()->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('delete')) {
            return [];
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'price' => ['required', 'numeric', 'min:0.01', 'decimal:0,2'],
            'min_duration' => ['required', 'integer', 'min:1', 'max:1440'],
            'max_duration' => ['required', 'integer', 'gte:min_duration', 'max:1440'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
