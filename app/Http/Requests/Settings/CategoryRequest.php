<?php

namespace App\Http\Requests\Settings;

use App\Models\ProviderCategory;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        $category = $this->route('category');

        if (! $user instanceof User || ! $user->hasRole('service_provider')) {
            return false;
        }

        return $category instanceof ProviderCategory
          ? $category->provider_profile_id === $user->providerProfile?->id
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

        $profileId = $this->user()?->providerProfile?->id;
        $category = $this->route('category');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('provider_categories', 'name')
                    ->where(fn ($query) => $query->where('provider_profile_id', $profileId))
                    ->ignore($category instanceof ProviderCategory ? $category->id : null),
            ],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
