<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum EducationLevelEnum: int
{
    use EnumMethods;

    case DOCTORATE = 1;
    case MASTER = 2;
    case POSTGRADUATE = 3;
    case PRIMARY_COMPLETE = 4;
    case PRIMARY_INCOMPLETE = 5;
    case SECONDARY_COMPLETE = 6;
    case SECONDARY_INCOMPLETE = 7;
    case TECHNICAL_COMPLETE = 8;
    case TECHNICAL_INCOMPLETE = 9;
    case UNIVERSITY_COMPLETE = 10;
    case UNIVERSITY_INCOMPLETE = 11;

    public function name(): string
    {
        return match ($this) {
            self::DOCTORATE => __('Doctorado'),
            self::MASTER => __('Maestría'),
            self::POSTGRADUATE => __('Postgrado'),
            self::PRIMARY_COMPLETE => __('Primaria Completa'),
            self::PRIMARY_INCOMPLETE => __('Primaria Incompleta'),
            self::SECONDARY_COMPLETE => __('Secundaria Completa'),
            self::SECONDARY_INCOMPLETE => __('Secundaria Incompleta'),
            self::TECHNICAL_COMPLETE => __('Técnica Completa'),
            self::TECHNICAL_INCOMPLETE => __('Técnica Incompleta'),
            self::UNIVERSITY_COMPLETE => __('Universidad Completa'),
            self::UNIVERSITY_INCOMPLETE => __('Universidad Incompleta'),
        };
    }
}