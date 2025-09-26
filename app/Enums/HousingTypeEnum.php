<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum HousingTypeEnum: int
{
    use EnumMethods;

    case OWN_HOUSE = 1;
    case RENTED = 2;
    case ANTICRETICO = 3;

    public function name(): string
    {
        return match ($this) {
            self::OWN_HOUSE => __('common.enums.housing_type.own_house'),
            self::RENTED => __('common.enums.housing_type.rented'),
            self::ANTICRETICO => __('common.enums.housing_type.anticretico'),
        };
    }
}