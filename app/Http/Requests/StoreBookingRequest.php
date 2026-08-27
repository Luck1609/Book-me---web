<?php

namespace App\Http\Requests;

use App\Models\Booking;
use App\Models\Service;
use App\Models\StaffMember;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return $user instanceof User && Gate::allows('create', Booking::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $providerProfileId = $this->user()?->providerProfile?->id;

        return [
            'client_name' => ['required', 'string', 'max:255'],
            'client_email' => ['required', 'email', 'max:255'],
            'service_id' => [
                'required',
                'uuid',
                Rule::exists((new Service)->getTable(), 'id')
                    ->where(fn ($query) => $query
                        ->where('provider_profile_id', $providerProfileId)
                        ->where('is_active', true)),
            ],
            'staff_member_id' => [
                'nullable',
                'uuid',
                Rule::exists((new StaffMember)->getTable(), 'id')
                    ->where(fn ($query) => $query->where('provider_profile_id', $providerProfileId)->where('is_active', true)),
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
