<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum EmploymentTypeEnum: int
{
    use EnumMethods;

    case ENTREPRENEURSHIP = 1;
    case COMPANY_EMPLOYEE = 2;

    public function name(): string
    {
        return match ($this) {
            self::ENTREPRENEURSHIP => __('common.enums.employment_type.entrepreneurship'),
            self::COMPANY_EMPLOYEE => __('common.enums.employment_type.company_employee'),
        };
    }
}