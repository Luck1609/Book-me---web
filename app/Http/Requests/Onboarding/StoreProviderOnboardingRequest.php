<?php

namespace App\Http\Requests\Onboarding;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreProviderOnboardingRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
    // return $this->user()?->hasRole('service_provider') === true
    //   && ! $this->user()->providerProfile()->exists();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'type' => ['required', 'in:provider,client'],
      'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
      'name' => ['required', 'string', 'max:255'],
      'category_id' => ['required', 'uuid', 'exists:categories,id'],
      'description' => ['required', 'string', 'max:5000'],
      'region_id' => ['required', 'uuid', 'exists:regions,id'],
      'district_id' => [
        'required',
        'uuid',
        Rule::exists('districts', 'id')->where('region_id', $this->input('region_id')),
      ],
      'city' => ['required', 'string', 'max:255'],
      'address' => ['required', 'string', 'max:255'],
      'working_days' => ['required', 'array', 'min:1', 'max:7'],
      'working_days.*' => ['required', 'string', 'distinct', Rule::in([
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ])],
      'opens_at' => ['required', 'date_format:H:i'],
      'closes_at' => ['required', 'date_format:H:i', 'after:opens_at'],
      'includes_holidays' => ['required', 'boolean'],
      'services' => ['required', 'array', 'min:1', 'max:20'],
      'services.*' => ['required', 'array'],
      'services.*.image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
      'services.*.name' => ['required', 'string', 'max:255'],
      'services.*.price' => ['required', 'numeric', 'min:0.01', 'decimal:0,2'],
      'services.*.min_duration' => ['required', 'integer', 'min:1', 'max:1440'],
      'services.*.max_duration' => ['required', 'integer', 'min:1', 'max:1440'],
      'services.*.description' => ['required', 'string', 'max:5000'],
    ];
  }

  /**
   * Get the validation callbacks for the request.
   *
   * @return array<int, callable(Validator): void>
   */
  public function after(): array
  {
    return [
      function (Validator $validator): void {
        $services = $this->input('services');

        if (! is_array($services)) {
          return;
        }

        foreach ($services as $index => $service) {
          if (! is_array($service)) {
            continue;
          }

          $minimumDuration = $service['min_duration'] ?? null;
          $maximumDuration = $service['max_duration'] ?? null;

          if (
            is_numeric($minimumDuration)
            && is_numeric($maximumDuration)
            && (int) $maximumDuration < (int) $minimumDuration
          ) {
            $validator->errors()->add(
              "services.{$index}.max_duration",
              'The maximum duration must be at least the minimum duration.',
            );
          }
        }
      },
    ];
  }
}
