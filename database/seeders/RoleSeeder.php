<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => UserTypeEnum::CLIENT]);
        Role::create(['name' => UserTypeEnum::PROVIDER]);
    }
}
