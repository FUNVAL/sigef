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

            $usersData = $this->loadJsonData('users.json');

            if (!$usersData) {
                $this->command->error('Error al cargar el archivo users.json');
                return;
            }

            $baseData = [
                'password' => Hash::make(env('DEFAULT_PASSWORD', '123456')),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $finalUsers = collect($usersData)->map(function ($userData) use ($baseData) {
                $userForDB = collect($userData)->except('role')->toArray();
                return array_merge($baseData, $userForDB);
            })->toArray();

            DB::table('users')->insert($finalUsers);

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
                continue;
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
