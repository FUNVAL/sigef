<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum GenderEnum: int
{
    use EnumMethods;

    case MALE = 1;
    case FEMALE = 2; 

    public function name(): string
    {
        return match ($this) {
            self::MALE => 'Masculino',
            self::FEMALE => 'Femenino', 
        };
    }
}
