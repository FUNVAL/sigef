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
            ['name' => 'Admin', 'description' => 'Usuario con acceso completo al sistema', 'guard_name' => 'web'],
            ['name' => 'Student', 'description' => 'Usuario con rol de estudiante', 'guard_name' => 'web'],
            ['name' => 'Teacher', 'description' => 'Usuario con rol de profesor', 'guard_name' => 'web'],
            ['name' => 'Controller', 'description' => 'Usuario con permisos de control y monitoreo', 'guard_name' => 'web'],
            ['name' => 'Recruiter', 'description' => 'Usuario encargado de reclutar nuevos estudiantes', 'guard_name' => 'web'],
        ]);
 
        $adminRole = Role::findByName('Admin'); 
        $adminRole->givePermissionTo(Permission::all());
    }
}
