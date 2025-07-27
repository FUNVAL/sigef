<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum JobTypeEnum: int
{
    use EnumMethods;

    case ONLINE = 1;
    case IN_PERSON = 2;
    case OWN_BOSS = 3;

    public function name(): string
    {
        return match ($this) {
            self::ONLINE => __('common.job_type.online'),
            self::IN_PERSON => __('common.job_type.in_person'),
            self::OWN_BOSS => __('common.job_type.own_boss'),
        };
    }
}
