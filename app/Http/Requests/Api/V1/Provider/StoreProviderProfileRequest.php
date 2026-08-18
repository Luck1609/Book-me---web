<?php

namespace App\Http\Requests\Api\V1\Provider;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProviderProfileRequest extends FormRequest
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
      'avatar' => ['nullable', 'image', 'mimes:png,jpg,webp,jpeg'],
      'business_name' => ['required', 'string', 'max:255'],
      'email' => ['nullable', 'email', 'max:255'],
      'address' => ['nullable', 'string', 'max:255'],
      'description' => ['nullable', 'string'],
      'phone' => ['nullable', 'regex:/^\+[1-9]\d{7,14}$/'],
      'region_id' => ['nullable', 'uuid', 'exists:regions,id'],
      'district_id' => ['nullable', 'uuid', 'exists:districts,id'],
      'city' => ['nullable', 'string', 'max:255'],
      'latitude' => ['nullable', 'numeric', 'between:-90,90'],
      'longitude' => ['nullable', 'numeric', 'between:-180,180'],
    ];
  }
}
