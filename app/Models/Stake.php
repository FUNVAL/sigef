<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    protected $fillable = [
        'name', 
        'country_id', 
        'user_id',
        'status'
    ];

    protected $casts = [
        'status' => StatusEnum::class,
    ];

    protected $attributes = [
        'status' => StatusEnum::ACTIVE,
    ];

    // Scopes para consultas comunes
    public function scopeActive($query)
    {
        return $query->where('status', StatusEnum::ACTIVE);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', StatusEnum::INACTIVE);
    }

    public function scopeNotDeleted($query)
    {
        return $query->whereIn('status', [StatusEnum::ACTIVE, StatusEnum::INACTIVE]);
    }

    public function scopeDeleted($query)
    {
        return $query->where('status', StatusEnum::DELETED);
    }

    // Métodos helper para cambiar estado
    public function deactivate()
    {
        $this->update(['status' => StatusEnum::INACTIVE]);
        return $this;
    }

    public function activate()
    {
        $this->update(['status' => StatusEnum::ACTIVE]);
        return $this;
    }

    public function markAsDeleted()
    {
        $this->update(['status' => StatusEnum::DELETED]);
        return $this;
    }

    // Métodos para verificar estado
    public function isActive()
    {
        return $this->status === StatusEnum::ACTIVE;
    }

    public function isInactive()
    {
        return $this->status === StatusEnum::INACTIVE;
    }

    public function isDeleted()
    {
        return $this->status === StatusEnum::DELETED;
    }

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}