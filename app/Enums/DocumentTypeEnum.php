<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum DocumentTypeEnum: int
{
    use EnumMethods;

    case DNI = 1;
    case DUI_EL_SALVADOR = 2;
    case FOREIGNER_CARD = 3;
    case INE_MEXICO = 4;
    case PASSPORT = 5;
    case PTP = 6;
    case REFUGEE_LETTER = 7;
    case RG_BRAZIL = 8;

    public function name(): string
    {
        return match ($this) {
            self::DNI => __('DNI (Documento Nacional de Identidad)'),
            self::DUI_EL_SALVADOR => __('DUI (Documento Único de Identidad) - El Salvador'),
            self::FOREIGNER_CARD => __('Tarjeta de Extranjero'),
            self::INE_MEXICO => __('INE (Instituto Nacional de Electoral) - México'),
            self::PASSPORT => __('Pasaporte'),
            self::PTP => __('PTP'),
            self::REFUGEE_LETTER => __('Carta de Refugio'),
            self::RG_BRAZIL => __('RG (Registro Geral) - Brasil'),
        };
    }
}
