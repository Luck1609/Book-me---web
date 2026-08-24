<?php

namespace Tests\Unit\Http\Requests\Onboarding;

use App\Http\Requests\Onboarding\StoreProviderOnboardingRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use Tests\TestCase;

class StoreProviderOnboardingRequestTest extends TestCase
{
    public function test_provider_onboarding_requires_the_core_fields(): void
    {
        $errors = $this->validationErrors([]);

        $validationErrors = $errors->toArray();

        $this->assertArrayHasKey('type', $validationErrors);
        $this->assertArrayHasKey('name', $validationErrors);
        $this->assertArrayHasKey('category_id', $validationErrors);
        $this->assertArrayHasKey('working_days', $validationErrors);
        $this->assertArrayNotHasKey('services', $validationErrors);
    }

    public function test_client_onboarding_only_requires_the_account_type(): void
    {
        $errors = $this->validationErrors(['type' => 'client']);

        $this->assertSame([], $errors->toArray());
    }

    public function test_closing_time_must_be_after_opening_time(): void
    {
        $errors = $this->validationErrors([
            'opens_at' => '17:00',
            'closes_at' => '09:00',
        ]);

        $this->assertArrayHasKey('closes_at', $errors->toArray());
    }

    public function test_service_maximum_duration_must_not_be_less_than_minimum_duration(): void
    {
        $errors = $this->validationErrors([
            'services' => [
                [
                    'min_duration' => '60',
                    'max_duration' => '30',
                ],
            ],
        ]);

        $this->assertArrayHasKey('services.0.max_duration', $errors->toArray());
    }

    public function test_provider_onboarding_allows_an_empty_services_list(): void
    {
        $errors = $this->validationErrors([
            'type' => 'provider',
            'services' => [],
        ]);

        $this->assertArrayNotHasKey('services', $errors->toArray());
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function validationErrors(array $data): MessageBag
    {
        $request = new StoreProviderOnboardingRequest;
        $request->replace($data);

        $validator = Validator::make($request->all(), $request->rules());

        foreach ($request->after() as $callback) {
            $validator->after($callback);
        }

        $validator->passes();

        return $validator->errors();
    }
}
