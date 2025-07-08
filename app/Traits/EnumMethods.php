<?php

namespace App\Traits;


trait EnumMethods
{
    /**
     * Convert enum cases to an array of objects with id and name
     * 
     * @return array Array of associative arrays with 'id' and 'name' keys
     */
    public static function toArray(): array
    {
        $result = [];
        foreach (self::cases() as $case) {
            $result[] = [
                'id' => $case->value,
                'name' => $case->name()
            ];
        }
        return $result;
    }

    /**
     * Convert enum cases to an associative array suitable for select lists
     * 
     * @return array Associative array with values as keys and names as values
     */
    public static function toSelectArray(): array
    {
        $result = [];
        foreach (self::cases() as $case) {
            $result[$case->value] = $case->name();
        }
        return $result;
    }

    /**
     * Find an enum case by its value/id
     * 
     * @param int|null $id The enum value to search for
     * @return self|null The matching enum case or null if not found
     */
    public static function fromId(?int $id): ?array
    {
        if ($id === null) {
            return null;
        }
        
        foreach (self::cases() as $case) {
            if ($case->value === $id) {
                return [
                    'id' => $case->value,
                    'name' => ucfirst($case->name())
                ];
            }
        }
        return null;
    }

    /**
     * Get all enum values as a simple array
     *
     * @return array Array containing all enum values
     */
    public static function values(): array
    {
        $result = [];
        foreach (self::cases() as $case) {
            $result[] = $case->value;
        }
        return $result;
    }
}
