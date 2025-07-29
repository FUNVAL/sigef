<?php

namespace App\Http\Controllers;

use App\Models\Stake;
use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StakeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Stake::query()->with(['country', 'user']);

        // Búsqueda simple para el frontend
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filtro por estado (si se necesita)
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            // Por defecto mostrar solo activos
            $query->active();
        }

        return Inertia::render('Stakes/Index', [
            'stakes' => $query->get(),
            'countries' => Country::all(),
            'users' => User::all(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:stakes',
            'country_id' => 'required|exists:countries,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        // Crear con estado activo por defecto
        Stake::create($validated + ['status' => 'active']);

        return redirect()->route('stakes.index')
               ->with('success', 'Stake creado exitosamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stake $stake)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:stakes,name,' . $stake->id,
            'country_id' => 'required|exists:countries,id',
            'user_id' => 'nullable|exists:users,id',
            'status' => 'sometimes|in:active,inactive' // Validación opcional para el estado
        ]);

        $stake->update($validated);

        return redirect()->back()
               ->with('success', 'Stake actualizado exitosamente');
    }

    /**
     * Desactivar (soft delete) el recurso especificado.
     */
    public function deactivate(Stake $stake)
    {
        $stake->deactivate();

        return redirect()->back()
               ->with('success', 'Stake desactivado correctamente');
    }

    /**
     * Activar el recurso especificado.
     */
    public function activate(Stake $stake)
    {
        $stake->activate();

        return redirect()->back()
               ->with('success', 'Stake activado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     * (Eliminación física - mantener solo si es realmente necesaria)
     */
    public function destroy(Stake $stake)
    {
        // Verificar si realmente necesitas este método
        // Lo ideal sería usar solo activate/deactivate
        $stake->forceDelete();

        return redirect()->back()
               ->with('success', 'Stake eliminado permanentemente');
    }
}