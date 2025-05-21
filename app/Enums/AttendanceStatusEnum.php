<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum AttendanceStatusEnum: int
{
    use EnumMethods;

    case PRESENT = 1;
    case ABSENT = 2;
    case EXCUSED = 3;
    case LATE = 4;

    public function name(): string
    {
        return match ($this) {
            self::PRESENT => 'Presente',
            self::ABSENT => 'Ausente',
            self::EXCUSED => 'Justificado',
            self::LATE => 'Tarde',
        };
    }
}
