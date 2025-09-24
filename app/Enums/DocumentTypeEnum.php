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
            self::DNI => __('DNI (Documento Nacional de Identidad)'),
            self::PASSPORT => __('Pasaporte'),
            self::PTP => __('PTP'),
            self::FOREIGNER_CARD => __('Tarjeta de Extranjero'),
            self::REFUGEE_LETTER => __('Carta de Refugio'),
            self::RG_BRAZIL => __('RG (Registro Geral) - Brasil'),
            self::DUI_EL_SALVADOR => __('DUI (Documento Único de Identidad) - El Salvador'),
            self::INE_MEXICO => __('INE (Instituto Nacional de Electoral) - México'),
        };
    }
}
