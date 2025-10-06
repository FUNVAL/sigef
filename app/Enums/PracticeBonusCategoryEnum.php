<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum PracticeBonusCategoryEnum: int
{
    use EnumMethods;

    case LOCAL_TRANSPORT = 1;
    case PROVINCIAL_TRANSPORT = 2;
    case FOOD = 3;

    public function name(): string
    {
        return match ($this) {
            self::LOCAL_TRANSPORT => __('common.enums.practice_bonus_category.local_transport'),
            self::PROVINCIAL_TRANSPORT => __('common.enums.practice_bonus_category.provincial_transport'),
            self::FOOD => __('common.enums.practice_bonus_category.food'),
        };
    }
}