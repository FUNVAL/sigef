<?php

namespace Database\Seeders;

use App\Enums\CourseModalityEnum;
use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::insert([
            [
                'name' => 'Asesor Comercial',
                'duration' => 5,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => 'Aire Acondicionado y Linea Blanca',
                'duration' => 8,
                'modality' => CourseModalityEnum::HYBRID->value,
                'status' => true,
            ],
            [
                'name' => 'Asesor Financiero',
                'duration' => 7,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => 'Auxiliar de Farmacia',
                'duration' => 8,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => 'Carpinteria en Aluminio & Melamine',
                'duration' => 6,
                'modality' => CourseModalityEnum::HYBRID->value,
                'status' => true,
            ],
            [
                'name' => 'Conectividad y redes',
                'duration' => 7,
                'modality' => CourseModalityEnum::HYBRID->value,
                'status' => true,
            ],
            [
                'name' => 'Desarrollo Web Frontend',
                'duration' => 12,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => 'Inglés',
                'duration' => 20,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => "Intérprete de Servicios Especializados",
                'duration' => 3,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => "IT Administator",
                'duration' => 8,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => "Logístico Sap",
                'duration' => 7,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => "Diseño Grafico & Marketing Digital",
                'duration' => 7,
                'modality' => CourseModalityEnum::ONLINE->value,
                'status' => true,
            ],
            [
                'name' => "Mecánica de Motos",
                'duration' => 6,
                'modality' => CourseModalityEnum::HYBRID->value,
                'status' => true,
            ],
        ]);
    }
}
