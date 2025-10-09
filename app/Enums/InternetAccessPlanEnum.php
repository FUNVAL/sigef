<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum InternetAccessPlanEnum: int
{
    use EnumMethods;

    case CHAPEL = 1;
    case FAMILY_FRIEND_HOUSE = 2;
    case HIRE_INTERNET_PLAN = 3;

    public function name(): string
    {
        return match ($this) {
            self::CHAPEL => __('common.enums.internet_access_plan.chapel'),
            self::FAMILY_FRIEND_HOUSE => __('common.enums.internet_access_plan.family_friend_house'),
            self::HIRE_INTERNET_PLAN => __('common.enums.internet_access_plan.hire_internet_plan'),
        };
    }
}