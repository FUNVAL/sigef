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
            self::NO => __('common.enums.mission_status.no'),
            self::YES => __('common.enums.mission_status.yes'),
            self::CURRENTLY_SERVING => __('common.enums.mission_status.currently_serving'),
        };
    }
}
