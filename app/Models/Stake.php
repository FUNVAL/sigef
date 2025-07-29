<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    // 1. Añadir 'status' a los campos fillable
    protected $fillable = [
        'name', 
        'country_id', 
        'user_id',
        'status' // Nuevo campo añadido
    ];

    // 2. Valor por defecto para el status (opcional pero recomendado)
    protected $attributes = [
        'status' => 'active'
    ];

    // 3. Scopes para consultas comunes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    // 4. Métodos helper para cambiar estado
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

    // 5. Método para verificar estado
    public function isActive()
    {
        return $this->status === 'active';
    }

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