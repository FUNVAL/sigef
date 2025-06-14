<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::insert([
            ['id' => 1, 'name' => 'Argentina', 'code' => 'ARG', 'flag' => '🇦🇷', 'phone_code' => '+54'],
            ['id' => 2, 'name' => 'Bolivia', 'code' => 'BOL', 'flag' => '🇧🇴', 'phone_code' => '+591'],
            ['id' => 3, 'name' => 'Brasil', 'code' => 'BRA', 'flag' => '🇧🇷', 'phone_code' => '+55'],
            ['id' => 4, 'name' => 'Chile', 'code' => 'CHL', 'flag' => '🇨🇱', 'phone_code' => '+56'],
            ['id' => 5, 'name' => 'Colombia', 'code' => 'COL', 'flag' => '🇨🇴', 'phone_code' => '+57'],
            ['id' => 6, 'name' => 'Costa Rica', 'code' => 'CRI', 'flag' => '🇨🇷', 'phone_code' => '+506'],
            ['id' => 7, 'name' => 'Ecuador', 'code' => 'ECU', 'flag' => '🇪🇨', 'phone_code' => '+593'],
            ['id' => 8, 'name' => 'El Salvador', 'code' => 'SLV', 'flag' => '🇸🇻', 'phone_code' => '+503'],
            ['id' => 9, 'name' => 'Guatemala', 'code' => 'GTM', 'flag' => '🇬🇹', 'phone_code' => '+502'],
            ['id' => 10, 'name' => 'Haití', 'code' => 'HTI', 'flag' => '🇭🇹', 'phone_code' => '+509'],
            ['id' => 11, 'name' => 'Honduras', 'code' => 'HND', 'flag' => '🇭🇳', 'phone_code' => '+504'],
            ['id' => 12, 'name' => 'México', 'code' => 'MEX', 'flag' => '🇲🇽', 'phone_code' => '+52'],
            ['id' => 13, 'name' => 'Nicaragua', 'code' => 'NIC', 'flag' => '🇳🇮', 'phone_code' => '+505'],
            ['id' => 14, 'name' => 'Panamá', 'code' => 'PAN', 'flag' => '🇵🇦', 'phone_code' => '+507'],
            ['id' => 15, 'name' => 'Paraguay', 'code' => 'PRY', 'flag' => '🇵🇾', 'phone_code' => '+595'],
            ['id' => 16, 'name' => 'Perú', 'code' => 'PER', 'flag' => '🇵🇪', 'phone_code' => '+51'],
            ['id' => 17, 'name' => 'República Dominicana', 'code' => 'DOM', 'flag' => '🇩🇴', 'phone_code' => '+1'],
            ['id' => 18, 'name' => 'Uruguay', 'code' => 'URY', 'flag' => '🇺🇾', 'phone_code' => '+598'],
            ['id' => 19, 'name' => 'Venezuela', 'code' => 'VEN', 'flag' => '🇻🇪', 'phone_code' => '+58'],
        ]);
    }
}
