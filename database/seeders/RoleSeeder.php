<?php

namespace Database\Seeders;

use Database\Seeders\Traits\JsonLoaderTrait;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    use JsonLoaderTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = $this->loadJsonData('roles.json');

        if ($roles === null) {
            return;
        }

        Role::insert($roles);

        $adminRole = Role::findByName('Administrador');
        $adminRole->givePermissionTo(Permission::all());
    }
}
