<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::insert([
            ['name' => 'Argentina', 'code' => 'ARG', 'flag' => '🇦🇷'],
            ['name' => 'Bolivia', 'code' => 'BOL', 'flag' => '🇧🇴'],
            ['name' => 'Brasil', 'code' => 'BRA', 'flag' => '🇧🇷'],
            ['name' => 'Chile', 'code' => 'CHL', 'flag' => '🇨🇱'],
            ['name' => 'Colombia', 'code' => 'COL', 'flag' => '🇨🇴'],
            ['name' => 'Costa Rica', 'code' => 'CRI', 'flag' => '🇨🇷'],
            ['name' => 'Ecuador', 'code' => 'ECU', 'flag' => '🇪🇨'],
            ['name' => 'El Salvador', 'code' => 'SLV', 'flag' => '🇸🇻'],
            ['name' => 'Guatemala', 'code' => 'GTM', 'flag' => '🇬🇹'],
            ['name' => 'Haití', 'code' => 'HTI', 'flag' => '🇭🇹'],
            ['name' => 'Honduras', 'code' => 'HND', 'flag' => '🇭🇳'],
            ['name' => 'México', 'code' => 'MEX', 'flag' => '🇲🇽'],
            ['name' => 'Nicaragua', 'code' => 'NIC', 'flag' => '🇳🇮'],
            ['name' => 'Panamá', 'code' => 'PAN', 'flag' => '🇵🇦'],
            ['name' => 'Paraguay', 'code' => 'PRY', 'flag' => '🇵🇾'],
            ['name' => 'Perú', 'code' => 'PER', 'flag' => '🇵🇪'],
            ['name' => 'República Dominicana', 'code' => 'DOM', 'flag' => '🇩🇴'],
            ['name' => 'Uruguay', 'code' => 'URY', 'flag' => '🇺🇾'],
            ['name' => 'Venezuela', 'code' => 'VEN', 'flag' => '🇻🇪'],
        ]);
    }
}
