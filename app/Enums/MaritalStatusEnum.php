<?php 

namespace App\Enums;

use App\Traits\EnumMethods;

enum MaritalStatusEnum: int
{
    use EnumMethods;

    case SINGLE = 1;
    case MARRIED = 2;
    case DIVORCED = 3;
    case WIDOWED = 4;
    case SEPARATED = 5;

    public function name(): string
    {
        return match($this) {
            self::SINGLE => 'Soltero',
            self::MARRIED => 'Casado',
            self::DIVORCED => 'Divorciado',
            self::WIDOWED => 'Viudo',
            self::SEPARATED => 'Separado',
        };
    } 
}
