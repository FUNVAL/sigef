<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum DocumentTypeEnum: int
{
    use EnumMethods;

    case IDENTITY_CARD = 1;
    case PASSPORT = 2;
    case DRIVER_LICENSE = 3;

    public function name(): string
    {
        return match ($this) {
            self::IDENTITY_CARD => __('common.enums.document_type.identity_card'),
            self::PASSPORT => __('common.enums.document_type.passport'),
            self::DRIVER_LICENSE => __('common.enums.document_type.driver_license'),
        };
    }
}
