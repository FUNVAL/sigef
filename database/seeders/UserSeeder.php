<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstname' => 'Jorge',
            'lastname' => 'Sosa',
            'email' => 'admin@mail.com',
            'gender' => 1,
            'document_type' => 1,
            'document_number' => '12345678',
            'birth_date' => '1990-01-01',
            'marital_status' => 1,
            'address' => '123 Main St',
            'contact_phone_1' => '1234567890',
            'contact_phone_2' => '0987654321',
            'password' => bcrypt('123456'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // assign the admin role to the user
        $user = User::where('email', 'admin@mail.com')->first();
        $user->assignRole('admin');
    }
}
