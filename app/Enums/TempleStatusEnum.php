<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum TempleStatusEnum: int
{
    use EnumMethods;

    case SEALED = 1;
    case NOT_SEALED = 2;

    public function name(): string
    {
        return match ($this) {
            self::SEALED => __('common.enums.temple_status.sealed'),
            self::NOT_SEALED => __('common.enums.temple_status.not_sealed'),
        };
    }
}