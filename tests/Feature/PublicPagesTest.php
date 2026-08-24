<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    public function test_public_marketing_pages_are_available(): void
    {
        foreach ([
            'home' => 'welcome',
            'about' => 'about',
            'contact' => 'contact',
            'privacy' => 'privacy-policy',
            'terms' => 'terms-and-conditions',
        ] as $routeName => $component) {
            $this->get(route($routeName))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page->component($component));
        }
    }
}
