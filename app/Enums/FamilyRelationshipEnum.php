<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum FamilyRelationshipEnum: int
{
    use EnumMethods;

    case GRANDPARENT = 1;
    case ROOMMATE = 2;
    case SIBLING_IN_LAW = 3;
    case SPOUSE = 4;
    case SIBLING = 5;
    case STEPCHILD = 6;
    case CHILD = 7;
    case MOTHER = 8;
    case FATHER = 9;
    case STEPPARENT = 10;
    case COUSIN = 11;
    case NEPHEW_NIECE = 12;
    case PARENT_IN_LAW = 13;
    case UNCLE_AUNT = 14;
    case CHILD_IN_LAW = 15;
    case OTHER = 16;

    public function name(): string
    {
        return match ($this) {
            self::GRANDPARENT => __('common.enums.family_relationship.grandparent'),
            self::ROOMMATE => __('common.enums.family_relationship.roommate'),
            self::SIBLING_IN_LAW => __('common.enums.family_relationship.sibling_in_law'),
            self::SPOUSE => __('common.enums.family_relationship.spouse'),
            self::SIBLING => __('common.enums.family_relationship.sibling'),
            self::STEPCHILD => __('common.enums.family_relationship.stepchild'),
            self::CHILD => __('common.enums.family_relationship.child'),
            self::MOTHER => __('common.enums.family_relationship.mother'),
            self::FATHER => __('common.enums.family_relationship.father'),
            self::STEPPARENT => __('common.enums.family_relationship.stepparent'),
            self::COUSIN => __('common.enums.family_relationship.cousin'),
            self::NEPHEW_NIECE => __('common.enums.family_relationship.nephew_niece'),
            self::PARENT_IN_LAW => __('common.enums.family_relationship.parent_in_law'),
            self::UNCLE_AUNT => __('common.enums.family_relationship.uncle_aunt'),
            self::CHILD_IN_LAW => __('common.enums.family_relationship.child_in_law'),
            self::OTHER => __('common.enums.family_relationship.other'),
        };
    }
}