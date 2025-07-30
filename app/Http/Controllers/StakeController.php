<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Stake;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StakeController extends Controller
{
    /**
     * Display a listing of the resource.
     * Allows filtering by name, id, country code and user_id
     */
    public function index(Request $request)
    {
        $query = Stake::query();

        // Filter by id if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        // Filter by name if provided
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filter by country code if provided
        if ($request->has('code')) {
            $query->whereHas('country', function ($q) use ($request) {
                $q->where('code', strtoupper($request->code));
            });
        }

        // Filter by user_id if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $stakes = $query->with(['country', 'user'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $stakes
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

        $stake = Stake::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Stake created successfully',
            'data' => $stake
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stake $stake)
    {
        $stake->load(['country', 'user']);

        return response()->json([
            'status' => 'success',
            'data' => $stake
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stake $stake)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:stakes,name,' . $stake->id,
            'country_id' => 'sometimes|exists:countries,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $stake->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Stake updated successfully',
            'data' => $stake
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stake $stake)
    {
        $stake->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Stake deleted successfully'
        ]);
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
