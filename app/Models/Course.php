<?php

namespace App\Models;

use App\Enums\CourseModalityEnum;
use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'duration',
        'modality',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function getModalityAttribute(): ?array
    {
        return  CourseModalityEnum::fromId($this->attributes['modality']);
    }

    public function getStatusAttribute(): ?array
    {
        return StatusEnum::fromId($this->attributes['status']);
    }
}
