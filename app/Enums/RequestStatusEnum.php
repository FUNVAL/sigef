<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum RequestStatusEnum: int
{
    use EnumMethods;

    case PENDING = 1;
    case APPROVED = 2;
    case REJECTED = 3;

    public function name(): string
    {
        return match ($this) {
            self::PENDING => 'Pendiente',
            self::APPROVED => 'Aprobado',
            self::REJECTED => 'Rechazado',
        };
    }
}
