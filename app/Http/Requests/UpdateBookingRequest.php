<?php

namespace App\Http\Requests;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $booking = $this->route('booking');

        return $user instanceof User
            && $booking instanceof Booking
            && Gate::allows('update', $booking);
    }

    public function rules(): array
    {
        return [
            'action' => ['required', Rule::in(['accept', 'reschedule'])],
            'date' => ['nullable', 'required_if:action,reschedule', 'date_format:Y-m-d', 'after_or_equal:today'],
            'time' => ['nullable', 'required_if:action,reschedule', 'date_format:H:i'],
        ];
    }
}
