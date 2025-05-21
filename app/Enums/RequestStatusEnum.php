<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum RequestStatusEnum: int
{
    use EnumMethods;

    case DRAFT = 1;
    case SUBMITTED = 2;
    case UNDER_REVIEW = 3;
    case APPROVED = 4;
    case REJECTED = 5;

    public function name(): string
    {
        return match ($this) {
            self::DRAFT => 'Borrador',
            self::SUBMITTED => 'Enviado',
            self::UNDER_REVIEW => 'En Revisión',
            self::APPROVED => 'Aprobado',
            self::REJECTED => 'Rechazado',
        };
    }
}
