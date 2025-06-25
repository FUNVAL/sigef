<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            ['name' => 'Responsable', 'description' => 'Usuario con rol de responsable', 'guard_name' => 'web'],
            ['name' => 'Administrador', 'description' => 'Usuario con acceso completo al sistema', 'guard_name' => 'web'],
            ['name' => 'Controller', 'description' => 'Usuario con permisos de control y monitoreo', 'guard_name' => 'web'],
            ['name' => 'IT', 'description' => 'Usuario del departamento de tecnología', 'guard_name' => 'web'],
            ['name' => 'Profesor', 'description' => 'Usuario con rol de profesor', 'guard_name' => 'web'],
            ['name' => 'Certificador', 'description' => 'Usuario encargado de certificaciones', 'guard_name' => 'web'],
            ['name' => 'Supervisor de responsable', 'description' => 'Usuario que supervisa a responsables', 'guard_name' => 'web'],
            ['name' => 'Auditor de empleo', 'description' => 'Usuario con rol de auditor de empleo', 'guard_name' => 'web'],
            ['name' => 'Director regional', 'description' => 'Usuario con rol de director regional', 'guard_name' => 'web'],
            ['name' => 'Supervisor académico', 'description' => 'Usuario con rol de supervisor académico', 'guard_name' => 'web'],
            ['name' => 'Director de escuela', 'description' => 'Usuario con rol de director de escuela', 'guard_name' => 'web'],
            ['name' => 'Director financiero', 'description' => 'Usuario con rol de director financiero', 'guard_name' => 'web'],
        ]);

        $adminRole = Role::findByName('Administrador');
        $adminRole->givePermissionTo(Permission::all());
    }
}
