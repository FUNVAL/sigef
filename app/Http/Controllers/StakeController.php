<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Stake;
use App\Models\User;
use Illuminate\Http\JsonResponse;
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

        // Mostrar solo activos e inactivos (no eliminados)
        $query->notDeleted();

        return Inertia::render('Stakes/Index', [
            'stakes' => $query->get(),
            'countries' => Country::all(),
            'users' => User::all(),
            'filters' => $request->only(['search'])
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
            'status' => 'required|in:active,inactive', // Solo permitir active/inactive en creación
        ]);

        Stake::create($validated);
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
            'status' => 'required|in:active,inactive' // Solo permitir cambios entre active/inactive
        ]);

        $stake->update($validated);

        return redirect()->back()
            ->with('success', 'Stake actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     * (Método para marcar como eliminado)
     */
    public function destroy(Stake $stake)
    {
        // Marcar como eliminado en lugar de eliminar físicamente
        $stake->markAsDeleted();

        return redirect()->back()->with('success', 'Stake eliminado correctamente');
    }

    /**
     * Filter stakes by country id for public forms.
     * Protected with API token validation.
     */
    public function filterByCountryId(Request $request, $country_id): JsonResponse
    {
        try {
            // Opción 1: exists() - Más eficiente, solo verifica existencia
            if (!Country::where('id', $country_id)->exists()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Country not found.'
                ], 404);
            }

            // Obtener stakes ordenados alfabéticamente
            $stakes = Stake::where('country_id', $country_id)
                ->select('id', 'name')
                ->orderBy('name', 'asc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $stakes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
