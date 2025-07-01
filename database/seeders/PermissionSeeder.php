<?php

namespace Database\Seeders;

use Database\Seeders\Traits\JsonLoaderTrait;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    use JsonLoaderTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Load permissions from JSON file
        $permissions = $this->loadJsonData('permissions.json');

        // If no permissions are found, exit the seeder
        if ($permissions === null) {
            return;
        }

        // Insert all permissions in a single query
        Permission::insert($permissions);
    }
}
