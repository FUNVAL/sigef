<?php

namespace Database\Factories;

use App\Enums\CourseModalityEnum;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\MissionStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Models\Country;
use App\Models\Stake;
use App\Models\PreInscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PreInscription>
 */
class PreInscriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PreInscription::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->optional(0.7)->firstName(),
            'last_name' => $this->faker->lastName(),
            'second_last_name' => $this->faker->optional(0.7)->lastName(),
            'gender' => $this->faker->randomElement(GenderEnum::cases())->value,
            'age' => $this->faker->numberBetween(18, 40),
            'phone' => $this->faker->phoneNumber(),
            'additional_phone' => $this->faker->optional(0.3)->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'marital_status' => $this->faker->randomElement(MaritalStatusEnum::cases())->value,
            'served_mission' => $this->faker->randomElement([1, 2, 3]), // MissionStatusEnum values
            'currently_working' => $this->faker->optional(0.9)->boolean(),
            'job_type_preference' => $this->faker->optional(0.8)->randomElement(CourseModalityEnum::cases())->value,
            'available_full_time' => $this->faker->optional(0.9)->boolean(),
            'status' => $this->faker->randomElement(RequestStatusEnum::cases())->value,
            'country_id' => random_int(1, 10), // Assuming you have 100 countries
            'stake_id' => random_int(1, 100),
            'modified_by' => $this->faker->optional(0.3, 0)->numberBetween(0, 1),
        ];
    }
}
