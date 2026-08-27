<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'period' => ['nullable', Rule::in(['7d', '30d', '90d', 'year', 'custom'])],
            'start_date' => [
                Rule::requiredIf(fn (): bool => $this->string('period')->toString() === 'custom'),
                'nullable',
                'date_format:Y-m-d',
            ],
            'end_date' => [
                Rule::requiredIf(fn (): bool => $this->string('period')->toString() === 'custom'),
                'nullable',
                'date_format:Y-m-d',
                'after_or_equal:start_date',
            ],
        ];
    }
}
