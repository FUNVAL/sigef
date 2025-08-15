<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Country;
use App\Models\Stake;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

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
            'status' => 'required|integer|in:' . StatusEnum::ACTIVE->value . ',' . StatusEnum::INACTIVE->value, // Solo permitir active/inactive en creación
        ]);

        // Asegurar que el status sea entero
        $validated['status'] = (int) $validated['status'];

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
            'status' => 'required|integer|in:' . StatusEnum::ACTIVE->value . ',' . StatusEnum::INACTIVE->value // Solo permitir cambios entre active/inactive
        ]);

        // Asegurar que el status sea entero
        $validated['status'] = (int) $validated['status'];

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
            // Verificar que el país existe
            if (!Country::where('id', $country_id)->exists()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Country not found.'
                ], 404);
            }

            // Obtener stakes ordenados alfabéticamente con información completa
            $stakes = Stake::where('country_id', $country_id)
                ->where('status', StatusEnum::ACTIVE->value)
                ->with(['user', 'country'])
                ->orderBy('name', 'asc')
                ->get();

            return response()->json([
                'status' => 'success',
                'stakes' => $stakes, // Cambiado de 'data' a 'stakes'
                'count' => $stakes->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get stakes assigned to a specific user
     */
    public function getUserStakes(int $userId): JsonResponse
    {
        try {
            $stakes = Stake::where('user_id', $userId)
                ->with(['country'])
                ->orderBy('updated_at', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'stakes' => $stakes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch user stakes: ' . $e->getMessage()
            ], 500);
        }
    }

    public function assignUser(Request $request, int $id)
    {
        $validated = $request->validate([
            'stakes' => 'required|array',
            'stakes.*' => 'exists:stakes,id'
        ]);

        try {
            $user = User::findOrFail($id);

            // Desasignar todas las estacas actuales del usuario
            Stake::where('user_id', $id)->update(['user_id' => null]);

            // Asignar las nuevas estacas al usuario
            $assignedCount = 0;
            if (!empty($validated['stakes'])) {
                $assignedCount = Stake::whereIn('id', $validated['stakes'])
                    ->update(['user_id' => $id]);
            }

            // Si es una petición AJAX, devolver JSON
            if ($request->expectsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Stakes assigned successfully.',
                    'assigned_count' => count($validated['stakes'])
                ]);
            }

            return redirect()->back()->with('success', 'Stakes assigned successfully.');
        } catch (\Exception $e) {

            if ($request->expectsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to assign stakes: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Failed to assign stakes: ' . $e->getMessage()])
                ->withInput();
        }
    }
}
