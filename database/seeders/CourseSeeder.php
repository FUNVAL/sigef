<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::insert([
            ['name' => 'Inglés para Call Center', 'status' => true],
            ['name' => 'Interpretación de servicios especializados', 'status' => true],
            ['name' => 'Ciberseguridad', 'status' => true],
            ['name' => 'Soldadura industrial', 'status' => true],
            ['name' => 'Reparación de celulares', 'status' => true],
            ['name' => 'Técnico logístico & SAP', 'status' => true],
            ['name' => 'Asistentes contables bilingües', 'status' => true],
            ['name' => 'Asesor comercial', 'status' => true],
            ['name' => 'Asesor financiero', 'status' => true],
            ['name' => 'Mecánica de motocicletas', 'status' => true],
            ['name' => 'Aire acondicionado y Línea Blanca', 'status' => true],
            ['name' => 'Auxiliar de farmacia', 'status' => true],
            ['name' => 'Carpintería en aluminio y Melamina', 'status' => true],
            ['name' => 'Conectividad y redes', 'status' => true],
            ['name' => 'Marketing digital', 'status' => true],
            ['name' => 'Desarrollador Web FrontEnd', 'status' => true]
        ]);
    }
}
