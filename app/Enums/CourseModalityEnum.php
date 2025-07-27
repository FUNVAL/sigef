<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum CourseModalityEnum: int
{
    use EnumMethods;

    case ONLINE = 1;
    case IN_PERSON = 2;
    case HYBRID = 3;

    public function name(): string
    {
        return match ($this) {
            self::ONLINE => __('common.course_modality.online'),
            self::IN_PERSON =>  __('common.course_modality.in_person'),
            self::HYBRID => __('common.course_modality.hybrid'),
        };
    }
}
