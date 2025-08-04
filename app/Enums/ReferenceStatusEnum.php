<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ReferenceStatusEnum: int
{
    use EnumMethods;

    case INCORRECT_NUMBER = 1;
    case WORK = 2;
    case STUDIES = 3;
    case NOT_CHURCH_MEMBER = 4;
    case FUTURE_MISSIONARY = 5;
    case HEALTH = 6;
    case GRADUATE = 7;
    case DUPLICATE = 8;
    case FEMALE = 9;

    public function name(): string
    {
        return match ($this) {
            self::INCORRECT_NUMBER => __('common.enums.reference_status.incorrect_number'),
            self::WORK => __('common.enums.reference_status.work'),
            self::STUDIES => __('common.enums.reference_status.studies'),
            self::NOT_CHURCH_MEMBER => __('common.enums.reference_status.not_church_member'),
            self::FUTURE_MISSIONARY => __('common.enums.reference_status.future_missionary'),
            self::HEALTH => __('common.enums.reference_status.health'),
            self::GRADUATE => __('common.enums.reference_status.graduate'),
            self::DUPLICATE => __('common.enums.reference_status.duplicate'),
            self::FEMALE => __('common.enums.reference_status.filtered'),
        };
    }
}
