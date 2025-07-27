<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum GenderEnum: int
{
    use EnumMethods;

    case MALE = 1;
    case FEMALE = 2;

    public function name(): string
    {
        return match ($this) {
            self::MALE => __('common.gender.male'),
            self::FEMALE => __('common.gender.female'),
        };
    }
}
