<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum MaritalStatusEnum: int
{
    use EnumMethods;

    case MARRIED = 1;
    case DIVORCED = 2;
    case SEPARATED = 3;
    case SINGLE = 4;
    case WIDOWED = 5;

    public function name(): string
    {
        return match ($this) {
            self::MARRIED => __('common.enums.marital_status.married'),
            self::DIVORCED => __('common.enums.marital_status.divorced'),
            self::SEPARATED => __('common.enums.marital_status.separated'),
            self::SINGLE => __('common.enums.marital_status.single'),
            self::WIDOWED => __('common.enums.marital_status.widowed'),
        };
    }
}
