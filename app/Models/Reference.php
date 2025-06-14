<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\ReferenceStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reference extends Model
{
    /** @use HasFactory<\Database\Factories\ReferenceFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'gender',
        'country_id',
        'phone',
        'stake_id',
        'status',
        'declined_reason',
        'referrer_name',
        'referrer_phone',
        'relationship_with_referred',
        'modifier_id',
    ];

    protected $hidden = [
        'country_id',
        'stake_id',
        'modifier_id',
    ];

    protected $appends = [
        'country',
        'stake',
        'modified_by'
    ];

    // Relaciones Eloquent
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function stake(): BelongsTo
    {
        return $this->belongsTo(Stake::class);
    }

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'modifier_id');
    }

    // Getters para enums
    public function getGenderAttribute(): ?array
    {
        return GenderEnum::fromId($this->attributes['gender']);
    }

    public function getDeclinedReasonAttribute(): ?array
    {
        return ReferenceStatusEnum::fromId($this->attributes['declined_reason']);
    }

    public function getCountryAttribute()
    {
        return $this->country()->first();
    }

    public function getStakeAttribute()
    {
        return $this->stake()->first();
    }

    public function getModifiedByAttribute()
    {
        $modifier = $this->modifier()->first();
        return $modifier ? ['id' => $modifier->id, 'name' => $modifier->fullname] : null;
    }
}
