<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            CountrySeeder::class,
            StakeSeeder::class,
            CourseSeeder::class,
            ReferenceSeeder::class,

            // Add other seeders here
        ]);
    }
}
