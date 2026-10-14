<?php

namespace App\Http\Requests\Settings;

use App\Models\ProviderAutomation;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProviderAutomationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        $automation = $this->route('notification');

        return $user instanceof User
            && $user->hasRole('service_provider')
            && $user->providerProfile()->exists()
            && (! $automation instanceof ProviderAutomation
                || $automation->provider_profile_id === $user->providerProfile?->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'enabled' => ['required', 'boolean'],
            'message' => ['nullable', 'string', 'max:2000', 'required_if:enabled,true'],
            'channels' => ['required', 'array', 'min:1'],
            'channels.*' => ['string', 'in:email,sms,whatsapp,push,in_app'],
        ];
    }
}
