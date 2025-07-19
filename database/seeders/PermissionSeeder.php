<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Grouped permissions to be inserted
        $permissions = [
            // User permissions
            ['name' => 'view users'],
            ['name' => 'create users'],
            ['name' => 'edit users'],
            ['name' => 'delete users'],

            // Role permissions
            ['name' => 'view roles'],
            ['name' => 'create roles'],
            ['name' => 'edit roles'],
            ['name' => 'delete roles'],

            // Permission permissions
            ['name' => 'view permissions'],
            ['name' => 'create permissions'],
            ['name' => 'edit permissions'],
            ['name' => 'delete permissions'],

            // Group permissions
            ['name' => 'view groups'],
            ['name' => 'create groups'],
            ['name' => 'edit groups'],
            ['name' => 'delete groups'],

            // Student permissions
            ['name' => 'view students'],
            ['name' => 'create students'],
            ['name' => 'edit students'],
            ['name' => 'delete students'],

            // Teacher permissions
            ['name' => 'view teachers'],
            ['name' => 'create teachers'],
            ['name' => 'edit teachers'],
            ['name' => 'delete teachers'],

            // Subject permissions
            ['name' => 'view subjects'],
            ['name' => 'create subjects'],
            ['name' => 'edit subjects'],
            ['name' => 'delete subjects'],

            // Country permissions
            ['name' => 'view  countries'],
            ['name' => 'create countries'],
            ['name' => 'edit countries'],
            ['name' => 'delete countries'],

            // Stake permissions
            ['name' => 'view  stakes'],
            ['name' => 'create stakes'],
            ['name' => 'edit stakes'],
            ['name' => 'delete stakes'],

            // Area permissions
            ['name' => 'view areas'],
            ['name' => 'create areas'],
            ['name' => 'edit areas'],
            ['name' => 'delete areas'],
        ];

        // Insert all permissions in a single query
        Permission::insert($permissions);
    }
}
