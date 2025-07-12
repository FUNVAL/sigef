<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    protected $fillable = ['name', 'country_id', 'user_id',];

    /**
     * Get the country associated with the stake.
     */
    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }

    /**
     * Get the user that owns the stake.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
