<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    protected $fillable = [
        'name', 
        'country_id', 
        'user_id',
        'status'
    ];

    protected $attributes = [
        'status' => 'active'
    ];

    // Scopes para consultas comunes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    public function scopeNotDeleted($query)
    {
        return $query->whereIn('status', ['active', 'inactive']);
    }

    public function scopeDeleted($query)
    {
        return $query->where('status', 'deleted');
    }

    // Métodos helper para cambiar estado
    public function deactivate()
    {
        $this->update(['status' => 'inactive']);
        return $this;
    }

    public function activate()
    {
        $this->update(['status' => 'active']);
        return $this;
    }

    public function markAsDeleted()
    {
        $this->update(['status' => 'deleted']);
        return $this;
    }

    // Métodos para verificar estado
    public function isActive()
    {
        return $this->status === 'active';
    }

    public function isInactive()
    {
        return $this->status === 'inactive';
    }

    public function isDeleted()
    {
        return $this->status === 'deleted';
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