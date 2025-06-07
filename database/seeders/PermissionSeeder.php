<?php

namespace Database\Seeders;
 
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
            ['name' => 'ver usuarios', 'description' => 'Permite ver la lista de usuarios', 'category' => 'Gestión de Usuarios', 'key' => 'user:view'],
            ['name' => 'crear usuarios', 'description' => 'Permite crear nuevos usuarios', 'category' => 'Gestión de Usuarios', 'key' => 'user:create'],
            ['name' => 'editar usuarios', 'description' => 'Permite editar usuarios existentes', 'category' => 'Gestión de Usuarios', 'key' => 'user:edit'],
            ['name' => 'eliminar usuarios', 'description' => 'Permite eliminar usuarios', 'category' => 'Gestión de Usuarios', 'key' => 'user:delete'],

            // Role permissions
            ['name' => 'ver roles', 'description' => 'Permite ver la lista de roles', 'category' => 'Gestión de Roles', 'key' => 'role:view'],
            ['name' => 'crear roles', 'description' => 'Permite crear nuevos roles', 'category' => 'Gestión de Roles', 'key' => 'role:create'],
            ['name' => 'editar roles', 'description' => 'Permite editar roles existentes', 'category' => 'Gestión de Roles', 'key' => 'role:edit'],
            ['name' => 'eliminar roles', 'description' => 'Permite eliminar roles', 'category' => 'Gestión de Roles', 'key' => 'role:delete'],

            // Permission permissions
            ['name' => 'ver permisos', 'description' => 'Permite ver la lista de permisos', 'category' => 'Gestión de Permisos', 'key' => 'permission:view'],
            ['name' => 'crear permisos', 'description' => 'Permite crear nuevos permisos', 'category' => 'Gestión de Permisos', 'key' => 'permission:create'],
            ['name' => 'editar permisos', 'description' => 'Permite editar permisos existentes', 'category' => 'Gestión de Permisos', 'key' => 'permission:edit'],
            ['name' => 'eliminar permisos', 'description' => 'Permite eliminar permisos', 'category' => 'Gestión de Permisos', 'key' => 'permission:delete'],

            // Group permissions
            ['name' => 'ver grupos', 'description' => 'Permite ver la lista de grupos', 'category' => 'Gestión de Grupos', 'key' => 'group:view'],
            ['name' => 'crear grupos', 'description' => 'Permite crear nuevos grupos', 'category' => 'Gestión de Grupos', 'key' => 'group:create'],
            ['name' => 'editar grupos', 'description' => 'Permite editar grupos existentes', 'category' => 'Gestión de Grupos', 'key' => 'group:edit'],
            ['name' => 'eliminar grupos', 'description' => 'Permite eliminar grupos', 'category' => 'Gestión de Grupos', 'key' => 'group:delete'],

            // Student permissions
            ['name' => 'ver estudiantes', 'description' => 'Permite ver la lista de estudiantes', 'category' => 'Gestión de Estudiantes', 'key' => 'student:view'],
            ['name' => 'crear estudiantes', 'description' => 'Permite crear nuevos estudiantes', 'category' => 'Gestión de Estudiantes', 'key' => 'student:create'],
            ['name' => 'editar estudiantes', 'description' => 'Permite editar estudiantes existentes', 'category' => 'Gestión de Estudiantes', 'key' => 'student:edit'],
            ['name' => 'eliminar estudiantes', 'description' => 'Permite eliminar estudiantes', 'category' => 'Gestión de Estudiantes', 'key' => 'student:delete'],

            // Teacher permissions
            ['name' => 'ver profesores', 'description' => 'Permite ver la lista de profesores', 'category' => 'Gestión de Profesores', 'key' => 'teacher:view'],
            ['name' => 'crear profesores', 'description' => 'Permite crear nuevos profesores', 'category' => 'Gestión de Profesores', 'key' => 'teacher:create'],
            ['name' => 'editar profesores', 'description' => 'Permite editar profesores existentes', 'category' => 'Gestión de Profesores', 'key' => 'teacher:edit'],
            ['name' => 'eliminar profesores', 'description' => 'Permite eliminar profesores', 'category' => 'Gestión de Profesores', 'key' => 'teacher:delete'],

            // Subject permissions
            ['name' => 'ver asignaturas', 'description' => 'Permite ver la lista de asignaturas', 'category' => 'Gestión de Asignaturas', 'key' => 'subject:view'],
            ['name' => 'crear asignaturas', 'description' => 'Permite crear nuevas asignaturas', 'category' => 'Gestión de Asignaturas', 'key' => 'subject:create'],
            ['name' => 'editar asignaturas', 'description' => 'Permite editar asignaturas existentes', 'category' => 'Gestión de Asignaturas', 'key' => 'subject:edit'],
            ['name' => 'eliminar asignaturas', 'description' => 'Permite eliminar asignaturas', 'category' => 'Gestión de Asignaturas', 'key' => 'subject:delete'],

            // Country permissions
            ['name' => 'ver países', 'description' => 'Permite ver la lista de países', 'category' => 'Gestión de Países', 'key' => 'country:view'],
            ['name' => 'crear países', 'description' => 'Permite crear nuevos países', 'category' => 'Gestión de Países', 'key' => 'country:create'],
            ['name' => 'editar países', 'description' => 'Permite editar países existentes', 'category' => 'Gestión de Países', 'key' => 'country:edit'],
            ['name' => 'eliminar países', 'description' => 'Permite eliminar países', 'category' => 'Gestión de Países', 'key' => 'country:delete'],

            // Stake permissions
            ['name' => 'ver estacas', 'description' => 'Permite ver la lista de estacas', 'category' => 'Gestión de Estacas', 'key' => 'stake:view'],
            ['name' => 'crear estacas', 'description' => 'Permite crear nuevas estacas', 'category' => 'Gestión de Estacas', 'key' => 'stake:create'],
            ['name' => 'editar estacas', 'description' => 'Permite editar estacas existentes', 'category' => 'Gestión de Estacas', 'key' => 'stake:edit'],
            ['name' => 'eliminar estacas', 'description' => 'Permite eliminar estacas', 'category' => 'Gestión de Estacas', 'key' => 'stake:delete'],

            // Area permissions
            ['name' => 'ver áreas', 'description' => 'Permite ver la lista de áreas', 'category' => 'Gestión de Áreas', 'key' => 'area:view'],
            ['name' => 'crear áreas', 'description' => 'Permite crear nuevas áreas', 'category' => 'Gestión de Áreas', 'key' => 'area:create'],
            ['name' => 'editar áreas', 'description' => 'Permite editar áreas existentes', 'category' => 'Gestión de Áreas', 'key' => 'area:edit'],
            ['name' => 'eliminar áreas', 'description' => 'Permite eliminar áreas', 'category' => 'Gestión de Áreas', 'key' => 'area:delete'],
        ];

        // Insert all permissions in a single query
        Permission::insert($permissions);
    }
}
