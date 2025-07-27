<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum StatusEnum: int
{
    use EnumMethods;

    case ACTIVE = 1;
    case INACTIVE = 2;
    case DELETED = 3;

    public function name(): string
    {
        return match ($this) {
            self::ACTIVE => __('common.status.active'),
            self::INACTIVE => __('common.status.inactive'),
            self::DELETED => __('common.status.deleted'),
        };
    }
}
