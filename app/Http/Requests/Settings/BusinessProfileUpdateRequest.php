<?php

namespace App\Http\Requests\Settings;

use App\Models\ProviderProfile;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BusinessProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $profile = $this->user()?->providerProfile;

        return $this->user()?->hasRole('service_provider') === true
            && $profile instanceof ProviderProfile;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'uuid', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'phone' => ['nullable', 'regex:/^\+[1-9]\d{7,14}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'region_id' => ['required', 'uuid', 'exists:regions,id'],
            'district_id' => [
                'required',
                'uuid',
                Rule::exists('districts', 'id')->where(
                    fn ($query) => $query->where('region_id', $this->string('region_id')->toString()),
                ),
            ],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'is_accepting_bookings' => ['sometimes', 'boolean'],
        ];
    }
}
