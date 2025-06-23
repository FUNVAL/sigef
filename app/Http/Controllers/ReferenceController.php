<?php

namespace App\Http\Controllers;

use App\Enums\GenderEnum;
use App\Enums\ReferenceStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\StatusEnum;
use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return  Inertia::render('pre-registration/references', [
                'references' => Reference::with(['country', 'stake', 'modifier'])
                    ->orderBy('created_at', 'desc')
                    ->get()
            ]);
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
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'gender' => 'integer',
                'age' => 'required|integer|min:18|max:120',
                'country_id' => 'required|exists:countries,id',
                'phone' => 'nullable|string|max:20',
                'stake_id' => 'required|exists:stakes,id',
                'referrer_name' => 'nullable|string|max:255',
                'referrer_phone' => 'nullable|string|max:20',
                'relationship_with_referred' => 'nullable|numeric',
            ]);

            Reference::create($validated);

            return redirect()->back()
                ->with('success', 'Referencia creada exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
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
    public function update(Request $request, $id)
    {
        try {
            $reference = Reference::findOrFail($id);
            $validated = $request->validate(
                [
                    'status' => 'required|in:' . implode(',', StatusEnum::values()),
                    'declined_reason' => [
                        'nullable',
                        'numeric',
                        function ($attribute, $value, $fail) use ($request) {
                            if ((int)$request->input('status') === 3 && empty($value)) {
                                $fail('El campo motivo de rechazo es obligatorio cuando el estatus es 3.');
                            }
                        },
                    ],
                    'declined_description' => [
                        'nullable',
                        'numeric',
                        function ($attribute, $value, $fail) use ($request) {
                            if ((int)$request->input('status') === 3 && empty($value)) {
                                $fail('El campo descripción de rechazo es obligatorio cuando el estatus es 3.');
                            }
                        },
                    ],

                ]
            );

            $validated['modifier_id'] = Auth::id();

            $reference->update($validated);
            $reference->save();
            return redirect()->back()
                ->with('success', 'Referencia actualizada exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
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
