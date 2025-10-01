<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ExpenseTypeEnum: int
{
    use EnumMethods;

    case ELECTRICITY = 1;
    case WATER = 2;
    case RENT = 3;
    case INTERNET = 4;
    case FOOD = 5;
    case TRANSPORTATION = 6;
    case PHONE = 7;
    case GAS = 8;
    case EDUCATION = 9;
    case HEALTHCARE = 10;
    case OTHERS = 11;

    public function name(): string
    {
        return match ($this) {
            self::ELECTRICITY => __('common.enums.expense_type.electricity'),
            self::WATER => __('common.enums.expense_type.water'),
            self::RENT => __('common.enums.expense_type.rent'),
            self::INTERNET => __('common.enums.expense_type.internet'),
            self::FOOD => __('common.enums.expense_type.food'),
            self::TRANSPORTATION => __('common.enums.expense_type.transportation'),
            self::PHONE => __('common.enums.expense_type.phone'),
            self::GAS => __('common.enums.expense_type.gas'),
            self::EDUCATION => __('common.enums.expense_type.education'),
            self::HEALTHCARE => __('common.enums.expense_type.healthcare'),
            self::OTHERS => __('common.enums.expense_type.others'),
        };
    }
}