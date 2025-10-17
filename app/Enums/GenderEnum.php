<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum GenderEnum: int
{
    use EnumMethods;

    case FEMALE = 1;
    case MALE = 2;

    public function name(): string
    {
        return match ($this) {
            self::FEMALE => __('common.enums.gender.female'),
            self::MALE => __('common.enums.gender.male'),
        };
    }
}
