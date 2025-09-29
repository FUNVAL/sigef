<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum DeviceTypeEnum: int
{
    use EnumMethods;

    case TABLET = 1;
    case COMPUTER = 2;
    case CELLPHONE = 3;
    case FUNVAL_EQUIPMENT = 4;

    public function name(): string
    {
        return match ($this) {
            self::TABLET => __('common.enums.device_type.tablet'),
            self::COMPUTER => __('common.enums.device_type.computer'),
            self::CELLPHONE => __('common.enums.device_type.cellphone'),
            self::FUNVAL_EQUIPMENT => __('common.enums.device_type.funval_equipment'),
        };
    }
}