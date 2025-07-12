<?php

namespace Database\Factories;

use App\Enums\RequestStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reference>
 */
class ReferenceFactory extends Factory
{

    /* 
    
        'name',
        'gender',
        'country',
        'phone',
        'stake',
        'status',
        'reason',
        'referrer_name',
        'referrer_phone',
        'relationship_with_referred',
        'modified_by'
    */
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'gender' => fake()->randomElement([1, 2]),
            'country_id' => fake()->numberBetween(1, 8),
            'phone' => fake()->phoneNumber(),
            'stake_id' => fake()->numberBetween(1, 10),
            'status' => fake()->randomElement(RequestStatusEnum::values()), // Assuming 1: Pending, 2: Approved, 3: Rejected
            'reason' => fake()->numberBetween(1, 11),
            'referrer_name' => fake()->name(),
            'referrer_phone' => fake()->phoneNumber(),
            'relationship_with_referred' => fake()->randomElement(['Friend', 'Family', 'Colleague', 'Other']),
            'modifier_id' => 1 // Assuming modified_by is a user ID
        ];
    }
}
