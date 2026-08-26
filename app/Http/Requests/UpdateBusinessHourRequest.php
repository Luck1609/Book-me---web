<?php

namespace App\Http\Requests;

use App\Models\BusinessHour;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateBusinessHourRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $businessHour = $this->route('business_hour');

        return $user instanceof User
            && $businessHour instanceof BusinessHour
            && Gate::allows('update', $businessHour);
    }

    public function rules(): array
    {
        return [
            'is_closed' => ['sometimes', 'boolean'],
            'opens_at' => [
                Rule::excludeIf(fn (): bool => $this->boolean('is_closed')),
                'required',
                'date_format:H:i',
            ],
            'closes_at' => [
                Rule::excludeIf(fn (): bool => $this->boolean('is_closed')),
                'required',
                'date_format:H:i',
                'after:opens_at',
            ],
        ];
    }
}
