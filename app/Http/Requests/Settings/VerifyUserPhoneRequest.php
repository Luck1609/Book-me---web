<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class VerifyUserPhoneRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone' => ['required', 'string', 'regex:/^\+233(?:20|23|24|25|26|27|28|50|54|55|59)\d{7}$/'],
            'code' => ['required', 'digits:6'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $phone = Str::replaceMatches('/\s+/', '', trim($this->string('phone')->toString()));

        $this->merge([
            'phone' => Str::startsWith($phone, '0') ? '+233'.Str::substr($phone, 1) : $phone,
        ]);
    }
}
