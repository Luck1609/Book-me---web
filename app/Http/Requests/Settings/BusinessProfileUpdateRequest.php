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
    if ($this->input('field') === 'details')
      return [
        'business_name' => ['required', 'string', 'max:255'],
        'category_id' => ['required', 'uuid', 'exists:categories,id'],
        'description' => ['nullable', 'string'],
        'phone' => ['nullable', 'phone:GH'],
        'email' => ['nullable', 'email', 'max:255'],
      'is_accepting_bookings' => ['sometimes', 'boolean'],
      ];

    return [

      'region_id' => ['required', 'uuid', 'exists:regions,id'],
      'district_id' => [
        'required',
        'uuid',
        Rule::exists('districts', 'id')->where(
          fn($query) => $query->where('region_id', $this->string('region_id')->toString()),
        ),
      ],
      'city' => ['required', 'string', 'max:255'],
      'address' => ['required', 'string', 'max:255'],
      'latitude' => ['nullable', 'numeric', 'between:-90,90'],
      'longitude' => ['nullable', 'numeric', 'between:-180,180'],
    ];
  }
}
