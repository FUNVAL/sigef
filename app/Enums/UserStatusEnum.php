<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum UserStatusEnum: int
{
    use EnumMethods;

    case ACTIVE = 1;
    case INACTIVE = 2;

    public function name(): string
    {
        return match ($this) {
            self::ACTIVE => __('common.user_status.active'),
            self::INACTIVE => __('common.user_status.inactive'),
        };
    }
}
