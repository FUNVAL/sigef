<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum RelatedReferenceEnum: int
{
    use EnumMethods;

    case FAMILY_MEMBER = 1;
    case FRIEND = 2;
    case CHURCH_MEMBER = 3;
    public function name(): string
    {
        return match ($this) {
            self::FAMILY_MEMBER => 'Familiar',
            self::FRIEND => 'Amigo',
            self::CHURCH_MEMBER => 'Miembro de la iglesia',
        };
    }
}
