<?php

namespace Database\Seeders;

use App\Models\Stake;
use Database\Seeders\Traits\JsonLoaderTrait;
use Illuminate\Database\Seeder;

class StakeSeeder extends Seeder
{
    use JsonLoaderTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stakes = $this->loadJsonData('stakes.json');
        if ($stakes === null) {
            return;
        }
        Stake::insert($stakes);
        $this->command->info('Estacas creadas exitosamente');
    }
}
