<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ReferenceStatusEnum: int
{

    use EnumMethods;

    case NOT_APPLICABLE = 1;
    case NO_ANSWER = 2;
    case INCORRECT_NUMBER = 3;
    case WORK = 4;
    case STUDIES = 5;
    case NOT_CHURCH_MEMBER = 6;
    case FUTURE_MISSIONARY = 7;
    case HEALTH = 8;
    case GRADUATE = 9;
    case DUPLICATE = 10;
    case TIMEOUT = 11;

    public function name(): string
    {

        return match ($this) {
            self::NOT_APPLICABLE => 'No aplica',
            self::NO_ANSWER => 'No contesta',
            self::INCORRECT_NUMBER => 'Número incorrecto',
            self::WORK => 'Trabajo',
            self::STUDIES => 'Estudios',
            self::NOT_CHURCH_MEMBER => 'No es miembro de la iglesia',
            self::FUTURE_MISSIONARY => 'Futuro Misionero',
            self::HEALTH => 'Salud',
            self::GRADUATE => 'Es Egresado',
            self::DUPLICATE => 'Duplicado',
            self::TIMEOUT => 'No tiene tiempo',
        };
    }
}
