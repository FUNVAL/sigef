<?php

namespace App\Http\Controllers;

use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $references = Reference::all();
            return response()->json($references);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener referencias',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Formulario para crear referencia'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'gender' => 'integer',
                'country_id' => 'required|exists:countries,id',
                'phone' => 'nullable|string|max:20',
                'stake_id' => 'required|exists:stakes,id',
                'status' => 'boolean',
                'reason' => 'nullable|integer',
                'referrer_name' => 'nullable|string|max:255',
                'referrer_phone' => 'nullable|string|max:20',
                'relationship_with_referred' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $data['modifier_id'] = Auth::id();

            $reference = Reference::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Referencia creada exitosamente',
                'data' => $reference
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear referencia',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reference $reference): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $reference
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la referencia',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reference $reference): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $reference
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la referencia para editar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reference $reference): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'string|max:255',
                'gender' => 'integer',
                'country_id' => 'exists:countries,id',
                'phone' => 'nullable|string|max:20',
                'stake_id' => 'exists:stakes,id',
                'status' => 'boolean',
                'reason' => 'nullable|integer',
                'referrer_name' => 'nullable|string|max:255',
                'referrer_phone' => 'nullable|string|max:20',
                'relationship_with_referred' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $data['modifier_id'] = Auth::id();

            $reference->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Referencia actualizada exitosamente',
                'data' => $reference
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la referencia',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reference $reference): JsonResponse
    {
        try {
            $reference->delete();

            return response()->json([
                'success' => true,
                'message' => 'Referencia eliminada exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la referencia',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
