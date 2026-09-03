<?php

namespace App\Http\Requests;

use App\Enums\UserTypeEnum;
use App\Models\ProviderProfile;
use App\Models\Service;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetProviderAvailabilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole(UserTypeEnum::CLIENT);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $providerProfile = $this->route('providerProfile');

        return [
            'service_id' => [
                'required',
                'uuid',
                Rule::exists((new Service())->getTable(), 'id')->where(fn ($query) => $query
                    ->where('provider_profile_id', $providerProfile->id)
                    ->where('is_active', true)),
            ],
            'date' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
        ];
    }
}
