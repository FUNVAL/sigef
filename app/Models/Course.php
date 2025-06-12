<?php

namespace App\Models;

use App\Enums\CourseModalityEnum;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'duration',
        'modality',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function getModalityAttribute(): ?array
    {
        return  CourseModalityEnum::fromId($this->attributes['modality']);
    }

    public function getDurationAttribute($value): string
    {
        return $value . ' ' . ($value === 1 ? 'semana' : 'semanas');
    }
}
