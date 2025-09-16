<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum EducationLevelEnum: int
{
    use EnumMethods;

    case PRIMARY_INCOMPLETE = 1;
    case PRIMARY_COMPLETE = 2;
    case SECONDARY_INCOMPLETE = 3;
    case SECONDARY_COMPLETE = 4;
    case UNIVERSITY_INCOMPLETE = 5;
    case UNIVERSITY_COMPLETE = 6;
    case TECHNICAL_INCOMPLETE = 7;
    case TECHNICAL_COMPLETE = 8;
    case POSTGRADUATE = 9;
    case MASTER = 10;
    case DOCTORATE = 11;

    public function name(): string
    {
        return match ($this) {
            self::PRIMARY_INCOMPLETE => __('common.enums.education_level.primary_incomplete'),
            self::PRIMARY_COMPLETE => __('common.enums.education_level.primary_complete'),
            self::SECONDARY_INCOMPLETE => __('common.enums.education_level.secondary_incomplete'),
            self::SECONDARY_COMPLETE => __('common.enums.education_level.secondary_complete'),
            self::UNIVERSITY_INCOMPLETE => __('common.enums.education_level.university_incomplete'),
            self::UNIVERSITY_COMPLETE => __('common.enums.education_level.university_complete'),
            self::TECHNICAL_INCOMPLETE => __('common.enums.education_level.technical_incomplete'),
            self::TECHNICAL_COMPLETE => __('common.enums.education_level.technical_complete'),
            self::POSTGRADUATE => __('common.enums.education_level.postgraduate'),
            self::MASTER => __('common.enums.education_level.master'),
            self::DOCTORATE => __('common.enums.education_level.doctorate'),
        };
    }
}