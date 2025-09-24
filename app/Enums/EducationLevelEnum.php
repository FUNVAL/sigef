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
            self::PRIMARY_INCOMPLETE => __('Primaria Incompleta'),
            self::PRIMARY_COMPLETE => __('Primaria Completa'),
            self::SECONDARY_INCOMPLETE => __('Secundaria Incompleta'),
            self::SECONDARY_COMPLETE => __('Secundaria Completa'),
            self::UNIVERSITY_INCOMPLETE => __('Universidad Incompleta'),
            self::UNIVERSITY_COMPLETE => __('Universidad Completa'),
            self::TECHNICAL_INCOMPLETE => __('Técnica Incompleta'),
            self::TECHNICAL_COMPLETE => __('Técnica Completa'),
            self::POSTGRADUATE => __('Postgrado'),
            self::MASTER => __('Maestría'),
            self::DOCTORATE => __('Doctorado'),
        };
    }
}