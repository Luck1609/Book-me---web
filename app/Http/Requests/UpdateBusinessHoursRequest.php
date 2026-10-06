<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateBusinessHoursRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->hasRole('service_provider') === true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'hours' => ['required', 'array', 'size:7'],
            'hours.*' => ['required', 'array:id,day_of_week,is_closed,opens_at,closes_at'],
            'hours.*.id' => ['required', 'uuid', 'distinct', 'exists:business_hours,id'],
            'hours.*.day_of_week' => ['required', 'integer', 'between:0,6', 'distinct'],
            'hours.*.is_closed' => ['required', 'boolean'],
            'hours.*.opens_at' => ['nullable', 'date_format:H:i'],
            'hours.*.closes_at' => ['nullable', 'date_format:H:i'],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [function (Validator $validator): void {
            foreach ($this->input('hours', []) as $index => $hour) {
                if (! is_array($hour)) {
                    continue;
                }

                if ((bool) ($hour['is_closed'] ?? false)) {
                    continue;
                }

                if (blank($hour['opens_at'] ?? null)) {
                    $validator->errors()->add("hours.{$index}.opens_at", 'An opening time is required for an open day.');
                }

                if (blank($hour['closes_at'] ?? null)) {
                    $validator->errors()->add("hours.{$index}.closes_at", 'A closing time is required for an open day.');
                }

                if (
                    filled($hour['opens_at'] ?? null)
                    && filled($hour['closes_at'] ?? null)
                    && preg_match('/^\d{2}:\d{2}$/', (string) $hour['opens_at'])
                    && preg_match('/^\d{2}:\d{2}$/', (string) $hour['closes_at'])
                    && $hour['closes_at'] <= $hour['opens_at']
                ) {
                    $validator->errors()->add("hours.{$index}.closes_at", 'The closing time must be after the opening time.');
                }
            }
        }];
    }
}
