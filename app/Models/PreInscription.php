<?php

namespace App\Models;

use App\Enums\CourseModalityEnum;
use App\Enums\GenderEnum;
use App\Enums\RequestStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PreInscription extends Model
{
    /** @use HasFactory<\Database\Factories\PreInscriptionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'second_last_name',
        'gender',
        'age',
        'phone',
        'email',
        'marital_status',
        'served_mission',
        'currently_working',
        'job_type_preference',
        'available_full_time',
        'status',
        'comments',
        'declined_reason',
        'modified_by',
        'country_id',
        'stake_id',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function stake(): BelongsTo
    {
        return $this->belongsTo(Stake::class);
    }

    public function getJobTypePreferenceAttribute(): ?array
    {
        return CourseModalityEnum::fromId($this->attributes['job_type_preference']);
    }

    public function getGenderAttribute(): ?array
    {
        return GenderEnum::fromId($this->attributes['gender']);
    }

    public function getStatusAttribute(): ?array
    {
        return RequestStatusEnum::fromId($this->attributes['status']);
    }

    public function getModifiedByAttribute(): ?string
    {
        $value = $this->attributes['modified_by'];
        if ($value === 0) {
            return 'System';
        }
        $user =  User::find($value);
        return $user ? $user->fullname : null;
    }
}
