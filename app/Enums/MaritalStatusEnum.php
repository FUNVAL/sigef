<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum MaritalStatusEnum: int
{
    use EnumMethods;

    case SINGLE = 1;
    case MARRIED = 2;
    case DIVORCED = 3;
    case WIDOWED = 4;
    case SEPARATED = 5;

    public function name(): string
    {
        return match ($this) {
            self::SINGLE => __('common.enums.marital_status.single'),
            self::MARRIED => __('common.enums.marital_status.married'),
            self::DIVORCED => __('common.enums.marital_status.divorced'),
            self::WIDOWED => __('common.enums.marital_status.widowed'),
            self::SEPARATED => __('common.enums.marital_status.separated'),
        };
    }
}
