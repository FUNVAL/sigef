<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum JobPositionEnum: int
{
    use EnumMethods;

    case MANAGER = 1;
    case SUPERVISOR = 2;
    case ANALYST = 3;
    case ASSISTANT = 4;
    case COORDINATOR = 5;
    case SPECIALIST = 6;
    case TECHNICIAN = 7;
    case OPERATOR = 8;
    case SALESPERSON = 9;
    case CUSTOMER_SERVICE = 10;
    case ACCOUNTANT = 11;
    case ADMINISTRATIVE = 12;

    public function name(): string
    {
        return match ($this) {
            self::MANAGER => __('common.enums.job_position.manager'),
            self::SUPERVISOR => __('common.enums.job_position.supervisor'),
            self::ANALYST => __('common.enums.job_position.analyst'),
            self::ASSISTANT => __('common.enums.job_position.assistant'),
            self::COORDINATOR => __('common.enums.job_position.coordinator'),
            self::SPECIALIST => __('common.enums.job_position.specialist'),
            self::TECHNICIAN => __('common.enums.job_position.technician'),
            self::OPERATOR => __('common.enums.job_position.operator'),
            self::SALESPERSON => __('common.enums.job_position.salesperson'),
            self::CUSTOMER_SERVICE => __('common.enums.job_position.customer_service'),
            self::ACCOUNTANT => __('common.enums.job_position.accountant'),
            self::ADMINISTRATIVE => __('common.enums.job_position.administrative'),
        };
    }
}