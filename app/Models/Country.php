<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';

    protected $fillable = [
        'name',
        'code',
        'phone_code',
        'flag',
        'status'
    ];



    public function getStatusAttribute(): ?array
    {
        return StatusEnum::fromId($this->attributes['status']);
    }
}

