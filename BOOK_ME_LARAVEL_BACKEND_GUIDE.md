# Book Me: Laravel Backend Implementation Guide

This guide explains how to build the Laravel backend for **Book Me**, an appointment-booking platform for clients and service providers. The initial target is the web application, but the backend should expose a versioned API so the same system can later serve the mobile app and PWA.

## 1. Product scope

### Clients

- Register, log in, and manage their profile.
- Discover approved service providers.
- Search and filter by location, service, rating, and availability.
- View a provider’s services, prices, duration, hours, photos, and reviews.
- Select a valid date and time.
- Create, view, cancel, and reschedule appointments.
- Receive reminders and submit a review after completion.

### Service providers

- Create and manage a business profile.
- Define services, prices, durations, business hours, and blocked periods.
- View and manage appointments.
- Confirm, decline, check in, start, complete, or mark an appointment as no-show.
- View appointment history, clients, reviews, and basic earnings information.

The backend must be the source of truth for availability, appointment status, permissions, and payment status. The frontend must never decide whether a slot is truly available.

## 2. Recommended foundation

- Laravel 1 or newer
- PHP 8.3 or newer
- Postgresql 
- Laravel Sanctum
- Spatie Laravel Permission
- Laravel API Resources
- Laravel Notifications and Queues
- Laravel Scheduler
- Pest or PHPUnit
<!-- - S3-compatible storage for production images -->

Create the project and install the main packages:

```bash
laravel new book-me-api
cd book-me-api
composer require laravel/sanctum spatie/laravel-permission
php artisan vendor:publish --provider="Laravel\Sanctum\ServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\ServiceProvider"
php artisan migrate
php artisan storage:link
```

Configure `.env`:

```env
APP_NAME="Book Me"
APP_ENV=local
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=book_me
DB_USERNAME=root
DB_PASSWORD=

QUEUE_CONNECTION=database
CACHE_STORE=database
FILESYSTEM_DISK=public
```

Create the queue table:

```bash
php artisan make:queue-table
php artisan migrate
```

## 3. Suggested application structure

```text
app/
├── Actions/
│   ├── Appointments/
│   ├── Availability/
│   └── Providers/
├── Enums/
├── Http/
│   ├── Controllers/Api/V1/
│   ├── Requests/
│   └── Resources/
├── Jobs/
├── Models/
├── Notifications/
├── Policies/
├── Services/
│   ├── AppointmentService.php
│   ├── AvailabilityService.php
│   └── QueueService.php
└── Support/
```

Keep controllers thin. Form Requests should validate input, Policies should authorize actions, and services/actions should contain booking rules.

## 4. Database design

### Users and roles

The `users` table should contain common identity fields:

```text
id                 UUID or ULID primary key
name               string
email              nullable unique string
phone              nullable unique string
password           nullable string
avatar_path        nullable string
email_verified_at  nullable timestamp
phone_verified_at  nullable timestamp
is_active          boolean default true
remember_token
timestamps
```

Use Spatie roles rather than scattering role checks throughout the codebase:

- `client`
- `service_provider`
- `admin`

### Provider profiles

```text
provider_profiles
------------------
id                    UUID/ULID
user_id               foreign key to users
business_name         string
slug                  unique string
description           nullable text
phone                 nullable string
email                 nullable string
address               nullable string
city                  nullable string
latitude              nullable decimal
longitude             nullable decimal
logo_path             nullable string
cover_path            nullable string
status                draft, pending_review, approved, suspended
is_accepting_bookings boolean default true
average_rating        decimal(3,2) default 0
review_count          unsigned integer default 0
timestamps
```

Add a unique constraint to `user_id` if one user may own only one business in the MVP.

### Services

```text
services
--------
id                    UUID/ULID
provider_profile_id   foreign key
name                  string
description           nullable text
price                 decimal(10,2)
duration_minutes      unsigned integer
is_active              boolean default true
requires_payment      boolean default false
sort_order            unsigned integer default 0
timestamps
soft deletes
```

Never trust a price or duration submitted by the client. Load both values from the service record on the server.

### Staff members

Staff can be optional in the first release, but adding the model early supports future barbers or employees:

```text
staff_members
-------------
id                    UUID/ULID
provider_profile_id   foreign key
name                  string
phone                 nullable string
photo_path            nullable string
is_active              boolean default true
timestamps
```

If staff perform only selected services, add a `service_staff` pivot table with `service_id` and `staff_member_id`.

### Business hours

```text
business_hours
--------------
id                    UUID/ULID
provider_profile_id   foreign key
day_of_week           tiny integer 0-6
is_closed             boolean default false
opens_at              nullable time
closes_at             nullable time
timestamps
```

Allow multiple rows for a day later if split shifts are needed.

### Availability blocks

```text
availability_blocks
--------------------
id                    UUID/ULID
provider_profile_id   foreign key
staff_member_id       nullable foreign key
starts_at             datetime
ends_at               datetime
type                  break, leave, holiday, blocked
reason                nullable string
timestamps
```

Store appointment and availability timestamps in UTC. Convert to the provider’s timezone at the presentation boundary.

### Appointments

```text
appointments
------------
id                    UUID/ULID
reference             unique string
client_id             foreign key to users
provider_profile_id   foreign key
service_id            foreign key
staff_member_id       nullable foreign key
starts_at             datetime
ends_at               datetime
status                enum
client_note           nullable text
provider_note         nullable text
cancelled_by          nullable foreign key to users
cancellation_reason   nullable text
confirmed_at          nullable datetime
checked_in_at         nullable datetime
started_at            nullable datetime
completed_at          nullable datetime
cancelled_at          nullable datetime
timestamps
soft deletes
```

Recommended statuses:

```text
pending, confirmed, checked_in, in_progress,
completed, cancelled, declined, no_show
```

Do not delete cancelled appointments. Preserve them for history, reporting, and disputes.

### Supporting tables

```text
appointment_status_histories
----------------------------
id, appointment_id, actor_id, from_status, to_status, note, created_at
```

```text
reviews
-------
id, appointment_id unique, client_id, provider_profile_id,
rating, comment nullable, is_visible, timestamps
```

```text
payments
--------
id, appointment_id, user_id, reference unique, provider nullable,
amount, currency default GHS, status, paid_at nullable, metadata JSON, timestamps
```

```text
device_tokens
-------------
id, user_id, token unique, platform, last_used_at, timestamps
```

Payments may be disabled in the MVP, but the relationship should exist so payment support can be added without redesigning appointments.

## 5. Models, enums, and relationships

Create enums for business values:

```php
enum AppointmentStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case CheckedIn = 'checked_in';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Declined = 'declined';
    case NoShow = 'no_show';
}
```

Example relationships:

```php
// User.php
public function providerProfile(): HasOne
{
    return $this->hasOne(ProviderProfile::class);
}

public function clientAppointments(): HasMany
{
    return $this->hasMany(Appointment::class, 'client_id');
}

// ProviderProfile.php
public function owner(): BelongsTo
{
    return $this->belongsTo(User::class, 'user_id');
}

public function services(): HasMany
{
    return $this->hasMany(Service::class);
}

public function appointments(): HasMany
{
    return $this->hasMany(Appointment::class);
}
```

Use `SoftDeletes` for services and appointments where history must remain available.

## 6. Authentication and authorization

### Web authentication

If the web version uses Blade, Livewire, or Inertia, use Laravel session authentication. Laravel Breeze is a practical starting point for registration, login, password reset, and email verification.

### API authentication

Use Sanctum tokens for the mobile application and any API-based web client:

```php
$token = $user->createToken('mobile-device')->plainTextToken;
```

Protect API routes with `auth:sanctum`.

### Permissions

Useful permissions include:

- `manage provider profile`
- `manage services`
- `manage availability`
- `view provider appointments`
- `manage provider appointments`
- `book appointments`
- `cancel own appointment`
- `submit reviews`

Use Policies for ownership. A provider must not edit another provider’s services or appointments merely because they have the provider role.

## 7. API design

Version the API from the beginning:

```text
/api/v1/auth/register
/api/v1/auth/login
/api/v1/providers
/api/v1/providers/{provider}/services
/api/v1/providers/{provider}/availability
/api/v1/appointments
```

Use API Resources and a consistent response shape:

```json
{
  "data": {},
  "message": "Appointment created successfully"
}
```

Recommended status codes:

| Code | Meaning |
|---:|---|
| 200 | Successful read or update |
| 201 | Resource created |
| 204 | Successful action with no body |
| 401 | Unauthenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 409 | Booking or state conflict |
| 422 | Validation failure |

### Endpoint plan

#### Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/forgot-password
GET    /auth/me
```

#### Client discovery

```text
GET    /providers
GET    /providers/{provider}
GET    /providers/{provider}/services
GET    /providers/{provider}/availability
GET    /providers/{provider}/reviews
```

Support `search`, `city`, `service`, `rating`, `date`, `sort`, `page`, and `per_page` parameters.

#### Client appointments

```text
POST   /appointments
GET    /appointments
GET    /appointments/{appointment}
PATCH  /appointments/{appointment}/reschedule
PATCH  /appointments/{appointment}/cancel
POST   /appointments/{appointment}/review
```

#### Provider setup

```text
GET    /provider/profile
POST   /provider/profile
PATCH  /provider/profile
POST   /provider/profile/logo
```

#### Provider services and availability

```text
GET    /provider/services
POST   /provider/services
GET    /provider/services/{service}
PATCH  /provider/services/{service}
DELETE /provider/services/{service}

GET    /provider/business-hours
PUT    /provider/business-hours
GET    /provider/availability-blocks
POST   /provider/availability-blocks
DELETE /provider/availability-blocks/{block}
```

#### Provider appointments

```text
GET    /provider/appointments
GET    /provider/appointments/{appointment}
PATCH  /provider/appointments/{appointment}/confirm
PATCH  /provider/appointments/{appointment}/decline
PATCH  /provider/appointments/{appointment}/check-in
PATCH  /provider/appointments/{appointment}/start
PATCH  /provider/appointments/{appointment}/complete
PATCH  /provider/appointments/{appointment}/no-show
```

## 8. Availability and slot generation

Create an `AvailabilityService` responsible for returning bookable slots.

A slot is bookable only when:

1. The provider is approved and accepting bookings.
2. The service is active.
3. The requested date is not in the past.
4. The slot falls within business hours.
5. It does not overlap a break, holiday, leave, or blocked period.
6. It does not overlap another active appointment.
7. Booking rules permit the requested advance time.
8. The selected staff member, if any, can perform the service and is available.

Calculate the end time from the server-side service duration:

```php
$endsAt = $startsAt->copy()->addMinutes($service->duration_minutes);
```

Future provider settings may include slot interval, minimum advance time, maximum booking window, buffer time, daily appointment limits, and cancellation deadline.

## 9. Safe appointment creation

Double booking is the most important backend risk. Appointment creation must be transactional and must recheck the slot while holding a database lock.

```php
return DB::transaction(function () use ($data) {
    $provider = ProviderProfile::query()
        ->lockForUpdate()
        ->findOrFail($data['provider_id']);

    $service = $provider->services()
        ->whereKey($data['service_id'])
        ->where('is_active', true)
        ->firstOrFail();

    $startsAt = Carbon::parse($data['starts_at']);
    $endsAt = $startsAt->copy()->addMinutes($service->duration_minutes);

    $overlapExists = Appointment::query()
        ->where('provider_profile_id', $provider->id)
        ->whereIn('status', [
            AppointmentStatus::Pending,
            AppointmentStatus::Confirmed,
            AppointmentStatus::CheckedIn,
            AppointmentStatus::InProgress,
        ])
        ->where('starts_at', '<', $endsAt)
        ->where('ends_at', '>', $startsAt)
        ->exists();

    if ($overlapExists) {
        throw new SlotUnavailableException();
    }

    $appointment = Appointment::create([
        'reference' => Str::upper('BM-' . Str::random(10)),
        'client_id' => auth()->id(),
        'provider_profile_id' => $provider->id,
        'service_id' => $service->id,
        'staff_member_id' => $data['staff_member_id'] ?? null,
        'starts_at' => $startsAt,
        'ends_at' => $endsAt,
        'status' => AppointmentStatus::Pending,
        'client_note' => $data['client_note'] ?? null,
    ]);

    AppointmentCreated::dispatch($appointment)->afterCommit();

    return $appointment;
});
```

Return `409 Conflict` when another request has already taken the slot. The frontend should refresh availability and ask the client to select another time.

For high traffic, consider a short cache lock or a dedicated slot-reservation table in addition to database overlap checks.

## 10. Appointment state transitions

Do not allow arbitrary status updates. Use explicit actions for valid transitions:

```text
pending       -> confirmed, declined, cancelled
confirmed     -> checked_in, cancelled, no_show
checked_in    -> in_progress, no_show
in_progress   -> completed
completed     -> no further operational state
```

Every transition should verify authorization, verify the current status, update the relevant timestamp, create a status-history record, and dispatch notifications after commit.

## 11. Rescheduling and cancellation

Rescheduling should behave like a new booking attempt:

1. Check the client’s permission.
2. Check the cancellation/reschedule policy.
3. Recalculate the service duration.
4. Lock and recheck overlap.
5. Update `starts_at` and `ends_at` atomically.
6. Record the change in appointment history.

Cancellation should capture who cancelled, when, the reason, and whether a refund is required. Do not remove the record.

## 12. Notifications and reminders

Create notifications for appointment requests, confirmation, decline, rescheduling, cancellation, reminders, reviews, and provider approval or suspension.

Use database and mail channels where appropriate:

```php
public function via($notifiable): array
{
    return ['database', 'mail'];
}
```

For mobile push notifications, store Expo or FCM tokens in `device_tokens` and send from queued jobs.

Use the scheduler for reminders:

```php
Schedule::job(new SendAppointmentRemindersJob)->everyFifteenMinutes();
```

Run workers locally with:

```bash
php artisan queue:work
php artisan schedule:work
```

Production should use Supervisor for queue workers and cron for the scheduler:

```cron
* * * * * cd /var/www/book-me && php artisan schedule:run >> /dev/null 2>&1
```

## 13. Validation and policies

Example request validation:

```php
class StoreAppointmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'provider_id' => ['required', 'uuid', 'exists:provider_profiles,id'],
            'service_id' => ['required', 'uuid', 'exists:services,id'],
            'staff_member_id' => ['nullable', 'uuid', 'exists:staff_members,id'],
            'starts_at' => ['required', 'date', 'after:now'],
            'client_note' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
```

Validation confirms the request shape. The service layer must still verify that the service belongs to the provider and that the requested time is available.

Create Policies for `ProviderProfile`, `Service`, `Appointment`, and `Review`:

- A client can view and manage only their own appointments.
- A provider can manage only appointments belonging to their profile.
- A provider can edit only their own services and business settings.
- A review can be created only by the client attached to a completed appointment.
- A review can be created only once per appointment.

## 14. Web and API presentation layers

If the web application uses Blade, Livewire, or Inertia, keep the domain logic independent of the presentation layer:

```text
Web/Livewire/Inertia request
        ↓
Form Request validation
        ↓
AppointmentService
        ↓
Database transaction
        ↓
Events, notifications, and history
```

This allows the Laravel web client, Expo mobile client, and future PWA to use the same booking rules.

## 15. Search and pagination

Provider discovery should support name, city, service, rating, selected date, distance, and sorting. Always paginate public results:

```php
ProviderProfile::query()
    ->with(['services:id,provider_profile_id,name,price,duration_minutes'])
    ->where('status', 'approved')
    ->where('is_accepting_bookings', true)
    ->paginate(20);
```

Add indexes to `status`, `city`, `provider_profile_id`, `starts_at`, `ends_at`, and appointment `status`.

## 16. Images and file storage

Providers may upload logos, cover images, gallery photos, and staff photos. Validate MIME type, size, and dimensions. Store only file paths in the database and generate URLs through Laravel Storage.

Use local storage during development and S3-compatible storage in production. Queue image resizing or optimization if it is introduced.

## 17. Payments

Online payments can be deferred for the MVP. When added:

1. Create a pending payment before redirecting to the gateway.
2. Never mark a payment paid from a browser redirect alone.
3. Verify gateway webhook signatures.
4. Make webhook handling idempotent.
5. Update payment and appointment state in a transaction.
6. Store gateway references and metadata for reconciliation.

Implement a `PaymentGateway` interface so the appointment domain does not depend on one payment provider.

## 18. Testing strategy

### Unit tests

Test slot generation, business-hour calculations, booking rules, status transitions, cancellation deadlines, and provider buffers.

### Feature tests

Test registration, login, provider setup, service ownership, provider discovery, appointment creation, conflict handling, rescheduling, cancellation, provider actions, and review eligibility.

### Concurrency test

Simulate two requests for the same provider, service, and time. Only one should succeed; the other should receive `409 Conflict`.

Run tests with:

```bash
php artisan test
```

## 19. Seeders and development data

Create factories and seeders for clients, providers, services such as haircut and shaving, business hours, appointments in every status, and reviews.

```bash
php artisan db:seed
```

Do not use production customer data in local seeders.

## 20. Admin functions

Protect admin functionality with the `admin` role and separate permissions. Admins should eventually be able to approve or suspend providers, manage users, moderate services and reviews, inspect appointments, reconcile payments, and view reports.

Do not expose administrative queries through public endpoints.

## 21. Security checklist

- Use HTTPS in production.
- Hash passwords with Laravel’s default hashing configuration.
- Verify email or phone before sensitive actions.
- Rate-limit login, OTP, and booking endpoints.
- Authorize every resource action.
- Never trust provider IDs, prices, or durations from the client.
- Validate uploaded files and restrict sizes.
- Protect payment webhooks with signatures.
- Do not log tokens or passwords.
- Set `APP_DEBUG=false` in production.
- Keep `.env` out of version control.
- Back up the database and test restoration.

## 22. Implementation phases

### Phase 1: Foundation

Create the Laravel project, configure MySQL, install Sanctum and Permission, create roles, add authentication, version API routes, and define exception handling.

### Phase 2: Provider setup

Build provider profiles, approval status, services CRUD, business hours, blocked periods, and image uploads.

### Phase 3: Client discovery

Build provider listing, search, filters, provider details, service listing, reviews, and availability endpoints.

### Phase 4: Booking engine

Build slot generation, transactional appointment creation, conflict handling, appointment details, cancellation, and rescheduling.

### Phase 5: Provider operations

Build the provider calendar, confirmation and decline actions, check-in, start, completion, no-show, and appointment history.

### Phase 6: Notifications and quality

Add database/email notifications, reminder jobs, queue workers, policies, status history, and automated tests.

### Phase 7: Optional extensions

Add online payments, push notifications, staff accounts, live queue status, chat, favorites, branches, analytics, subscriptions, and loyalty features.

## 23. MVP completion checklist

- Clients and providers can register and log in.
- Roles and ownership rules are enforced.
- Providers can create profiles and services.
- Providers can define hours and blocked periods.
- Clients can browse approved providers.
- Clients can retrieve valid slots.
- Clients can create appointments.
- Double booking is prevented transactionally.
- Providers can confirm or decline appointments.
- Clients can view, cancel, and reschedule appointments.
- Providers can check in, start, complete, and mark no-show.
- Notifications are queued and persisted.
- Appointment history is preserved.
- Automated tests cover booking and permissions.
- Production has a working scheduler, queue worker, HTTPS, backups, and monitoring.

## Final architectural principle

Treat appointment creation as a business transaction, not ordinary CRUD. The frontend may display slots, but Laravel must recalculate availability, enforce provider rules, prevent overlap, record the state transition, and notify the relevant users. If this boundary is designed correctly, the backend can support the Laravel web application now and the mobile app and PWA later.
