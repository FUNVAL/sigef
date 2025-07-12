<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum StatusEnum: int
{
    use EnumMethods;

    case ACTIVE = 1;
    case INACTIVE = 2;
    case DELETED = 3;

    public function name(): string
    {
        return match ($this) {
            self::ACTIVE => 'Activo',
            self::INACTIVE => 'Inactivo',
            self::DELETED => 'Eliminado',
        };
    }
}
