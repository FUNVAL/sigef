<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum BonusCategoryEnum: int
{
    use EnumMethods;

    case FAMILY = 1;
    case SINGLE = 2;
    case INTERNET = 3;

    public function name(): string
    {
        return match ($this) {
            self::FAMILY => __('common.enums.bonus_category.family'),
            self::SINGLE => __('common.enums.bonus_category.single'),
            self::INTERNET => __('common.enums.bonus_category.internet'),
        };
    }
}