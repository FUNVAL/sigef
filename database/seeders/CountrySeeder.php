<?php

namespace Database\Seeders;

use App\Models\Country;
use Database\Seeders\Traits\JsonLoaderTrait;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    use JsonLoaderTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = $this->loadJsonData('countries.json');

        if ($countries === null) {
            return;
        }

        Country::insert($countries);

        $this->command->info('Países cargados exitosamente desde countries.json');
    }
}
