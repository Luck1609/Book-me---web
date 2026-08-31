<?php

namespace App\Http\Requests;

use App\Enums\ProviderStatus;
use App\Enums\UserTypeEnum;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreClientBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();

        return $user instanceof User && $user->hasRole(UserTypeEnum::CLIENT->value);
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $providerProfileId = $this->string('provider_profile_id')->toString();

        return [
            'provider_profile_id' => [
                'required',
                'uuid',
                Rule::exists((new ProviderProfile)->getTable(), 'id')->where(fn ($query) => $query
                    ->where('status', ProviderStatus::Approved->value)
                    ->where('is_accepting_bookings', true)),
            ],
            'service_id' => [
                'required',
                'uuid',
                Rule::exists((new Service)->getTable(), 'id')->where(fn ($query) => $query
                    ->where('provider_profile_id', $providerProfileId)
                    ->where('is_active', true)),
            ],
            'duration_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
            'date' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /** @return array<int, callable(Validator): void> */
    public function after(): array
    {
        return [function (Validator $validator): void {
            $service = Service::query()->find($this->input('service_id'));
            $duration = (int) $this->input('duration_minutes');

            if ($service === null || $duration < $service->min_duration_minutes || $duration > $service->max_duration_minutes) {
                $validator->errors()->add('duration_minutes', 'Choose a duration offered by the selected service.');
            }
        }];
    }
}
