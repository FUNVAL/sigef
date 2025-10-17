<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum WorkScheduleEnum: int
{
    use EnumMethods;

    case MORNING = 1;
    case AFTERNOON = 2;
    case NIGHT = 3;

    public function name(): string
    {
        return match ($this) {
            self::MORNING => __('common.enums.work_schedule.morning'),
            self::AFTERNOON => __('common.enums.work_schedule.afternoon'),
            self::NIGHT => __('common.enums.work_schedule.night'),
        };
    }
}