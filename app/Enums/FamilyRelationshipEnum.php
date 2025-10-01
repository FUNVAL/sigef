<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum FamilyRelationshipEnum: int
{
    use EnumMethods;

    case FATHER = 1;
    case MOTHER = 2;
    case SPOUSE = 3;
    case SON = 4;
    case DAUGHTER = 5;
    case BROTHER = 6;
    case SISTER = 7;
    case GRANDFATHER = 8;
    case GRANDMOTHER = 9;
    case UNCLE = 10;
    case AUNT = 11;
    case COUSIN = 12;
    case NEPHEW = 13;
    case NIECE = 14;
    case FATHER_IN_LAW = 15;
    case MOTHER_IN_LAW = 16;
    case SON_IN_LAW = 17;
    case DAUGHTER_IN_LAW = 18;
    case BROTHER_IN_LAW = 19;
    case SISTER_IN_LAW = 20;
    case STEPFATHER = 21;
    case STEPMOTHER = 22;
    case STEPSON = 23;
    case STEPDAUGHTER = 24;
    case ROOMMATE = 25;
    case OTHER = 26;

    public function name(): string
    {
        return match ($this) {
            self::FATHER => __('common.enums.family_relationship.father'),
            self::MOTHER => __('common.enums.family_relationship.mother'),
            self::SPOUSE => __('common.enums.family_relationship.spouse'),
            self::SON => __('common.enums.family_relationship.son'),
            self::DAUGHTER => __('common.enums.family_relationship.daughter'),
            self::BROTHER => __('common.enums.family_relationship.brother'),
            self::SISTER => __('common.enums.family_relationship.sister'),
            self::GRANDFATHER => __('common.enums.family_relationship.grandfather'),
            self::GRANDMOTHER => __('common.enums.family_relationship.grandmother'),
            self::UNCLE => __('common.enums.family_relationship.uncle'),
            self::AUNT => __('common.enums.family_relationship.aunt'),
            self::COUSIN => __('common.enums.family_relationship.cousin'),
            self::NEPHEW => __('common.enums.family_relationship.nephew'),
            self::NIECE => __('common.enums.family_relationship.niece'),
            self::FATHER_IN_LAW => __('common.enums.family_relationship.father_in_law'),
            self::MOTHER_IN_LAW => __('common.enums.family_relationship.mother_in_law'),
            self::SON_IN_LAW => __('common.enums.family_relationship.son_in_law'),
            self::DAUGHTER_IN_LAW => __('common.enums.family_relationship.daughter_in_law'),
            self::BROTHER_IN_LAW => __('common.enums.family_relationship.brother_in_law'),
            self::SISTER_IN_LAW => __('common.enums.family_relationship.sister_in_law'),
            self::STEPFATHER => __('common.enums.family_relationship.stepfather'),
            self::STEPMOTHER => __('common.enums.family_relationship.stepmother'),
            self::STEPSON => __('common.enums.family_relationship.stepson'),
            self::STEPDAUGHTER => __('common.enums.family_relationship.stepdaughter'),
            self::ROOMMATE => __('common.enums.family_relationship.roommate'),
            self::OTHER => __('common.enums.family_relationship.other'),
        };
    }
}