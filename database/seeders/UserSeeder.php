<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\Traits\JsonLoaderTrait;

class UserSeeder extends Seeder
{
    use JsonLoaderTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Cargar datos desde JSON
            $usersData = $this->loadJsonData('users.json');

            if (!$usersData) {
                $this->command->error('Error al cargar el archivo users.json');
                return;
            }

            // Datos base comunes para evitar repetición
            $baseData = [
                'gender' => 1,
                'document_type' => 1,
                'birth_date' => '1990-01-01',
                'marital_status' => 1,
                'contact_phone_1' => '1234567890',
                'contact_phone_2' => '0987654321',
                'password' => Hash::make('123456'),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Procesar usuarios del JSON (remover campo 'role' para la inserción)
            $finalUsers = collect($usersData)->map(function ($userData) use ($baseData) {
                $userForDB = collect($userData)->except('role')->toArray();
                return array_merge($baseData, $userForDB);
            })->toArray();

            // Insertar usuarios en la base de datos
            DB::table('users')->insert($finalUsers);

            // Asignar roles usando los nombres del JSON
            $this->assignRoles($usersData);

            $this->command->info('Usuarios creados y roles asignados exitosamente');
        });
    }

    /**
     * Asignar roles a los usuarios
     */
    private function assignRoles(array $usersData): void
    {
        foreach ($usersData as $userData) {
            if (!isset($userData['role']) || !isset($userData['id'])) {
                continue; // Saltar registros incompletos
            }

            $user = User::find($userData['id']);
            
            if (!$user) {
                $this->command->warning("Usuario con ID {$userData['id']} no encontrado");
                continue;
            }

            try {
                $user->assignRole($userData['role']);
                $this->command->info("Rol '{$userData['role']}' asignado a {$user->firstname} {$user->lastname}");
            } catch (\Exception $e) {
                $this->command->error("Error asignando rol '{$userData['role']}' a {$user->firstname} {$user->lastname}: " . $e->getMessage());
            }
        }
    }
}
