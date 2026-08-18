<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    foreach (['client', 'service_provider', 'admin'] as $role) {
      Role::findOrCreate($role, 'web');
    }

    foreach (
      [
        'manage provider profile',
        'manage services',
        'manage availability',
        'book appointments',
        'submit reviews',
      ] as $permission
    ) {
      Permission::findOrCreate($permission, 'web');
    }

    $user = User::factory()->create([
      'name' => 'Test User',
      'email' => 'test@example.com',
    ]);

    $user->assignRole('client');
  }
}
