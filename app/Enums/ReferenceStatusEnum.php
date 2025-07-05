<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ReferenceStatusEnum: int
{

    use EnumMethods;


    case INCORRECT_NUMBER = 1;
    case WORK = 2;
    case STUDIES = 3;
    case NOT_CHURCH_MEMBER = 4;
    case FUTURE_MISSIONARY = 5;
    case HEALTH = 6;
    case GRADUATE = 7;
    case DUPLICATE = 8;
    case FEMALE = 9;

    public function name(): string
    {

        return match ($this) {
            self::INCORRECT_NUMBER => 'Número incorrecto',
            self::WORK => 'Trabajo',
            self::STUDIES => 'Estudios',
            self::NOT_CHURCH_MEMBER => 'No es miembro de la iglesia',
            self::FUTURE_MISSIONARY => 'Futuro misionero',
            self::HEALTH => 'Salud',
            self::GRADUATE => 'Es egresado',
            self::DUPLICATE => 'Duplicado',
            self::FEMALE => 'FILTRADA'
        };
    }
}
