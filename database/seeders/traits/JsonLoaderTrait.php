<?php

namespace Database\Seeders\Traits;

trait JsonLoaderTrait
{
    /**
     * Carga y valida datos desde un archivo JSON
     *
     * @param string $jsonFileName Nombre del archivo JSON (ej: 'countries.json')
     * @return array|null Retorna los datos del JSON o null si hay error
     */
    protected function loadJsonData(string $jsonFileName): ?array
    {
        $jsonPath = database_path("seeders/data/{$jsonFileName}");

        if (!file_exists($jsonPath)) {
            $this->command->error("El archivo {$jsonFileName} no existe en: {$jsonPath}");
            return null;
        }

        $jsonContent = file_get_contents($jsonPath);
        $data = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error("Error al decodificar el archivo {$jsonFileName}: " . json_last_error_msg());
            return null;
        }

        if (empty($data)) {
            $this->command->warning("El archivo {$jsonFileName} está vacío o no contiene datos válidos");
            return null;
        }

        return $data;
    }
}
