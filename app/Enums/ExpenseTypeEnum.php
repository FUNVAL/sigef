<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ExpenseTypeEnum: int
{
    use EnumMethods;

    case FOOD = 1;
    case RENT = 2;
    case EDUCATION = 3;
    case WATER = 4;
    case ELECTRICITY = 5;
    case GAS = 6;
    case INTERNET = 7;
    case MEDICINE = 8;
    case DEBT_PAYMENT = 9;
    case HEALTHCARE = 10;
    case INSURANCE = 11;
    case PHONE = 12;
    case TRANSPORTATION = 13;
    case OTHERS = 14;

    public function name(): string
    {
        return match ($this) {
            self::FOOD => __('common.enums.expense_type.food'),
            self::RENT => __('common.enums.expense_type.rent'),
            self::EDUCATION => __('common.enums.expense_type.education'),
            self::WATER => __('common.enums.expense_type.water'),
            self::ELECTRICITY => __('common.enums.expense_type.electricity'),
            self::GAS => __('common.enums.expense_type.gas'),
            self::INTERNET => __('common.enums.expense_type.internet'),
            self::MEDICINE => __('common.enums.expense_type.medicine'),
            self::DEBT_PAYMENT => __('common.enums.expense_type.debt_payment'),
            self::HEALTHCARE => __('common.enums.expense_type.healthcare'),
            self::INSURANCE => __('common.enums.expense_type.insurance'),
            self::PHONE => __('common.enums.expense_type.phone'),
            self::TRANSPORTATION => __('common.enums.expense_type.transportation'),
            self::OTHERS => __('common.enums.expense_type.others'),
        };
    }
}