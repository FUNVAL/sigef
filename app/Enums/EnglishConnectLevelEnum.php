<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum EnglishConnectLevelEnum: int
{
    use EnumMethods;

    case NONE = 1;
    case LEVEL_1 = 2;
    case LEVEL_2 = 3;
    case LEVEL_3 = 4;
    case COMPLETED = 5;

    public function name(): string
    {
        return match ($this) {
            self::NONE => __('common.enums.english_connect_level.none'),
            self::LEVEL_1 => __('common.enums.english_connect_level.level_1'),
            self::LEVEL_2 => __('common.enums.english_connect_level.level_2'),
            self::LEVEL_3 => __('common.enums.english_connect_level.level_3'),
            self::COMPLETED => __('common.enums.english_connect_level.completed'),
        };
    }
}