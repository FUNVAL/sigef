<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum JobTypeEnum: int
{
    use EnumMethods;

    case ONLINE = 1;
    case IN_PERSON = 2;
    case OWN_BOSS = 3;

    public function name(): string
    {
        return match ($this) {
            self::ONLINE => 'En Línea',
            self::IN_PERSON => 'Presencial',
            self::OWN_BOSS => 'Empendimiento',
        };
    }
}
