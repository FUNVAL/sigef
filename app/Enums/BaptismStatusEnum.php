<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum BaptismStatusEnum: int
{
    use EnumMethods;

    case YES = 1;
    case NO = 2;

    public function name(): string
    {
        return match ($this) {
            self::YES => __('common.enums.baptism_status.yes'),
            self::NO => __('common.enums.baptism_status.no'),
        };
    }
}