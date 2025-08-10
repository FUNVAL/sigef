<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum RelatedReferenceEnum: int
{
    use EnumMethods;

    case FAMILY_MEMBER = 1;
    case FRIEND = 2;
    case CHURCH_MEMBER = 3;

    public function name(): string
    {
        return match ($this) {
            self::FAMILY_MEMBER => __('common.enums.related_reference.family'),
            self::FRIEND => __('common.enums.related_reference.friend'),
            self::CHURCH_MEMBER => __('common.enums.related_reference.church_member'),
        };
    }
}
