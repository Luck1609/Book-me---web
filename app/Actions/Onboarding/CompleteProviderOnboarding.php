<?php

namespace App\Actions\Onboarding;

use App\Enums\UserTypeEnum;
use App\Models\ProviderProfile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CompleteProviderOnboarding
{
  /**
   * Complete onboarding for a client or service provider.
   *
   * @param  array<string, mixed>  $data
   */
  public function __invoke(User $user, array $data): void
  {
    DB::transaction(function () use ($user, $data): void {
      if ($data['type'] === UserTypeEnum::CLIENT->value) {
        $user->assignRole(Role::findOrCreate(UserTypeEnum::CLIENT->value, 'web'));
        $user->update(['has_onboarded' => true]);

        return;
      }

      $profile = $user->providerProfile()->create([
        'region_id' => $data['region_id'],
        'district_id' => $data['district_id'],
        'category_id' => $data['category_id'],
        'business_name' => $data['name'],
        'description' => $data['description'],
        'phone' => $user->phone,
        'email' => $user->email,
        'address' => $data['address'],
        'city' => $data['city'],
        'working_days' => $data['working_days'],
        'works_on_holidays' => filter_var($data['includes_holidays'], FILTER_VALIDATE_BOOLEAN),
      ]);

      $this->createBusinessHours($profile, $data);
      $this->createServices($profile, $data['services'] ?? []);

      if (($data['avatar'] ?? null) instanceof UploadedFile) {
        $profile->addMedia($data['avatar'])->toMediaCollection('avatar');
      }

      $user->assignRole(Role::findOrCreate('service_provider', 'web'));
      $user->update(['has_onboarded' => true]);
    });
  }

  /**
   * @param  array<string, mixed>  $data
   */
  private function createBusinessHours(ProviderProfile $profile, array $data): void
  {
    $workingDays = array_flip($data['working_days']);
    $days = [
      'sunday' => 0,
      'monday' => 1,
      'tuesday' => 2,
      'wednesday' => 3,
      'thursday' => 4,
      'friday' => 5,
      'saturday' => 6,
    ];

    $profile->businessHours()->createMany(
      array_map(
        fn(int $dayNumber, string $dayName): array => [
          'day_of_week' => $dayNumber,
          'is_closed' => ! array_key_exists($dayName, $workingDays),
          'opens_at' => array_key_exists($dayName, $workingDays) ? $data['opens_at'] : null,
          'closes_at' => array_key_exists($dayName, $workingDays) ? $data['closes_at'] : null,
        ],
        array_values($days),
        array_keys($days),
      ),
    );
  }

  /**
   * @param  array<int, array<string, mixed>>  $services
   */
  private function createServices(ProviderProfile $profile, array $services): void
  {
    foreach ($services as $index => $serviceData) {
      $service = $profile->services()->create([
        'name' => $serviceData['name'],
        'description' => $serviceData['description'],
        'price' => $serviceData['price'],
        'min_duration_minutes' => $serviceData['min_duration'],
        'max_duration_minutes' => $serviceData['max_duration'],
        'sort_order' => $index,
      ]);

      if (($serviceData['image'] ?? null) instanceof UploadedFile) {
        $service->addMedia($serviceData['image'])->toMediaCollection('image');
      }
    }
  }
}
