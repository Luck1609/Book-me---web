<?php

namespace App\Http\Controllers\Settings;

use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProviderAutomationRequest;
use App\Models\ProviderAutomation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class NotificationController extends Controller
{
    /** @var array<string, array{category: string, title: string, description: string, timing: string, channels: array<int, string>, message: string}> */
    private const AUTOMATIONS = [
        'appointment_reminder_3_days' => ['category' => 'Reminders', 'title' => '3 days before appointment', 'description' => 'Give clients time to prepare for their upcoming appointment.', 'timing' => '3 days before the appointment', 'channels' => ['email'], 'message' => 'Hi {client_name}, this is a reminder that your {service_name} appointment is coming up on {appointment_date}.'],
        'appointment_reminder_24_hours' => ['category' => 'Reminders', 'title' => '24 hours before appointment', 'description' => 'A friendly reminder the day before a client visits.', 'timing' => '24 hours before the appointment', 'channels' => ['sms'], 'message' => 'Hi {client_name}, we look forward to seeing you tomorrow at {appointment_time} for {service_name}.'],
        'appointment_reminder_1_hour' => ['category' => 'Reminders', 'title' => '1 hour before appointment', 'description' => 'Help clients arrive on time with a last-minute reminder.', 'timing' => '1 hour before the appointment', 'channels' => ['sms'], 'message' => 'Hi {client_name}, your {service_name} appointment starts in 1 hour. See you soon!'],
        'new_appointment' => ['category' => 'Appointment updates', 'title' => 'New appointment', 'description' => 'Confirm a new booking as soon as it is made.', 'timing' => 'When an appointment is booked', 'channels' => ['email'], 'message' => 'Hi {client_name}, your {service_name} appointment with {business_name} is booked for {appointment_date} at {appointment_time}.'],
        'rescheduled_appointment' => ['category' => 'Appointment updates', 'title' => 'Rescheduled appointment', 'description' => 'Keep clients informed when their appointment time changes.', 'timing' => 'When an appointment is rescheduled', 'channels' => ['email'], 'message' => 'Hi {client_name}, your {service_name} appointment has been moved to {appointment_date} at {appointment_time}.'],
        'cancelled_appointment' => ['category' => 'Appointment updates', 'title' => 'Cancelled appointment', 'description' => 'Let clients know when an appointment is cancelled.', 'timing' => 'When an appointment is cancelled', 'channels' => ['email'], 'message' => 'Hi {client_name}, your {service_name} appointment on {appointment_date} has been cancelled. Please contact us if you would like to book again.'],
        'waitlist_joined' => ['category' => 'Waitlist updates', 'title' => 'Joined the waitlist', 'description' => 'Confirm that a client has joined your waitlist.', 'timing' => 'When a client joins the waitlist', 'channels' => ['email'], 'message' => 'Hi {client_name}, you are on the waitlist for {service_name}. We will let you know when a time becomes available.'],
        'waitlist_available' => ['category' => 'Waitlist updates', 'title' => 'Time slot available', 'description' => 'Invite waitlisted clients to book an available time.', 'timing' => 'When a waitlist slot opens', 'channels' => ['sms'], 'message' => 'Good news, {client_name}! A time is now available for {service_name}. Book it before it is gone.'],
        'rebook_after_visit' => ['category' => 'Increase bookings', 'title' => 'Reminder to rebook', 'description' => 'Bring clients back after their last appointment.', 'timing' => 'After a completed appointment', 'channels' => ['email'], 'message' => 'Hi {client_name}, ready for your next {service_name}? We would love to see you again.'],
        'new_client_welcome' => ['category' => 'Celebrate milestones', 'title' => 'Welcome new clients', 'description' => 'Make a great first impression with a warm welcome.', 'timing' => 'After a client’s first appointment', 'channels' => ['email'], 'message' => 'Welcome to {business_name}, {client_name}! Thank you for choosing us. We look forward to seeing you again.'],
        'new_chat_message' => ['category' => 'Client messages', 'title' => 'New chat message', 'description' => 'Let clients know when you reply through Book Me.', 'timing' => 'When you send a chat message', 'channels' => ['email'], 'message' => 'Hi {client_name}, you have a new message from {business_name}.'],
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        if ($request->user()->hasRole(UserTypeEnum::Client->value)) {
            return inertia('settings/client/notification', []);
        }

        $page = $request->query('target');

        return match ($page) {
            'automation' => inertia('settings/provider/notification/automation', [
                'target' => $page,
                'automations' => $this->automationData($request),
            ]),
            default => inertia('settings/provider/notification/index', [
                'target' => $page,
            ]),
        };
    }

    public function update(ProviderAutomationRequest $request, ProviderAutomation $notification): RedirectResponse
    {
        $notification->update($request->validated());

        return back()->with('success', 'Automation updated.');
    }

    /** @return array<string, mixed> */
    private function automationData(Request $request): array
    {
        abort_unless($request->user() instanceof User, 401);

        $profile = $request->user()->providerProfile()->firstOrFail();
        $saved = $profile->automations()->get()->keyBy('key');

        return collect(self::AUTOMATIONS)
            ->map(function (array $definition, string $key) use ($profile, $saved): array {
                $automation = $saved->get($key) ?? $profile->automations()->create([
                    'key' => $key,
                    'enabled' => false,
                    'message' => $definition['message'],
                    'channel' => $definition['channels'][0],
                    'channels' => $definition['channels'],
                ]);

                return [...$definition, 'id' => $automation->id, 'key' => $key, 'enabled' => $automation->enabled, 'message' => $automation->message, 'channels' => $automation->channels ?: [$automation->channel ?: 'email']];
            })
            ->groupBy('category')
            ->map(fn ($items, string $category): array => ['category' => $category, 'items' => $items->values()->all()])
            ->values()
            ->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
