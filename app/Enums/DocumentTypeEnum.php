<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum DocumentTypeEnum: int
{
    use EnumMethods;

    case IDENTITY_CARD = 1;
    case PASSPORT = 2;
    case DRIVER_LICENSE = 3; 

    public function name(): string
    {
        return match ($this) {
            self::IDENTITY_CARD => 'Cédula de Identidad',
            self::PASSPORT => 'Pasaporte',
            self::DRIVER_LICENSE => 'Licencia de Conducir', 
        };
    }
}
