<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum DocumentTypeEnum: int
{
    use EnumMethods;

    case DNI = 1;
    case PASSPORT = 2;
    case PTP = 3;
    case FOREIGNER_CARD = 4;
    case REFUGEE_LETTER = 5;
    case RG_BRAZIL = 6;
    case DUI_EL_SALVADOR = 7;
    case INE_MEXICO = 8;

    public function name(): string
    {
        return match ($this) {
            self::DNI => __('common.enums.document_type.dni'),
            self::PASSPORT => __('common.enums.document_type.passport'),
            self::PTP => __('common.enums.document_type.ptp'),
            self::FOREIGNER_CARD => __('common.enums.document_type.foreigner_card'),
            self::REFUGEE_LETTER => __('common.enums.document_type.refugee_letter'),
            self::RG_BRAZIL => __('common.enums.document_type.rg_brazil'),
            self::DUI_EL_SALVADOR => __('common.enums.document_type.dui_el_salvador'),
            self::INE_MEXICO => __('common.enums.document_type.ine_mexico'),
        };
    }
}
