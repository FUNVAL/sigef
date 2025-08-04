<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum MissionStatusEnum: int
{
    use EnumMethods;

    case NO = 1;
    case YES = 2;
    case CURRENTLY_SERVING = 3;

    public function name(): string
    {
        return match ($this) {
            self::NO => 'No',
            self::YES => 'Sí',
            self::CURRENTLY_SERVING => 'Aún sirviendo',
        };
    }
}
