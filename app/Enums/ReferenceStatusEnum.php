<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ReferenceStatusEnum: int
{
    use EnumMethods;

    case WORK = 1;
    case STUDIES = 2;
    case NOT_CHURCH_MEMBER = 3;
    case FUTURE_MISSIONARY = 4;
    case HEALTH = 5;
    case GRADUATE = 6;
    case DUPLICATE = 7;
    case NO_APPLY = 8;
    case INCORRECT_NUMBER = 9;
    case NO_RESPONSE = 10;
    case NO_CONTACT = 11;

    public function name(): string
    {
        return match ($this) {
            self::WORK => __('common.enums.reference_status.work'),
            self::STUDIES => __('common.enums.reference_status.studies'),
            self::NOT_CHURCH_MEMBER => __('common.enums.reference_status.not_church_member'),
            self::FUTURE_MISSIONARY => __('common.enums.reference_status.future_missionary'),
            self::HEALTH => __('common.enums.reference_status.health'),
            self::GRADUATE => __('common.enums.reference_status.graduate'),
            self::DUPLICATE => __('common.enums.reference_status.duplicate'),
            self::NO_APPLY => __('common.enums.reference_status.no_apply'),
            self::INCORRECT_NUMBER => __('common.enums.reference_status.incorrect_number'),
            self::NO_RESPONSE => __('common.enums.reference_status.no_response'),
            self::NO_CONTACT => __('common.enums.reference_status.no_contact'),
        };
    }
}
