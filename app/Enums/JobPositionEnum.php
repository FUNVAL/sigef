<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum JobPositionEnum: int
{
    use EnumMethods;

    case ADMINISTRATIVE = 1;
    case ANALYST = 2;
    case ASSISTANT = 3;
    case CUSTOMER_SERVICE = 4;
    case ACCOUNTANT = 5;
    case COORDINATOR = 6;
    case SPECIALIST = 7;
    case MANAGER = 8;
    case OPERATOR = 9;
    case SUPERVISOR = 10;
    case TECHNICIAN = 11;
    case SALESPERSON = 12;
    case OTHER = 13;

    public function name(): string
    {
        return match ($this) {
            self::ADMINISTRATIVE => __('common.enums.job_position.administrative'),
            self::ANALYST => __('common.enums.job_position.analyst'),
            self::ASSISTANT => __('common.enums.job_position.assistant'),
            self::CUSTOMER_SERVICE => __('common.enums.job_position.customer_service'),
            self::ACCOUNTANT => __('common.enums.job_position.accountant'),
            self::COORDINATOR => __('common.enums.job_position.coordinator'),
            self::SPECIALIST => __('common.enums.job_position.specialist'),
            self::MANAGER => __('common.enums.job_position.manager'),
            self::OPERATOR => __('common.enums.job_position.operator'),
            self::SUPERVISOR => __('common.enums.job_position.supervisor'),
            self::TECHNICIAN => __('common.enums.job_position.technician'),
            self::SALESPERSON => __('common.enums.job_position.salesperson'),
            self::OTHER => __('common.enums.job_position.other'),
        };
    }
}