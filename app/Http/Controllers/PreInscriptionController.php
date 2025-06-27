<?php

namespace App\Http\Controllers;

use App\Models\PreInscription;
use App\Models\Country;
use App\Models\Stake;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\CourseModalityEnum;
use App\Enums\ReferenceStatusEnum;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class PreInscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();

            $query = PreInscription::query()->with(['country', 'stake'])->orderBy('created_at', 'desc');

            if ($user->hasRole('Responsable') && !$user->hasRole('Administrador')) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            return Inertia::render('pre-registration/pre-inscription', [
                'preInscriptions' => $query->get()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error loading pre-inscriptions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            // load view with inertia
            return inertia('pre-registration/pre-registration', [
                'countries' => Country::all(),
                'stakes' => Stake::all(),
                'courses' => Course::all()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error loading pre-inscription creation form',
                'error' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Debug: Log the incoming data
            \Log::info('Pre-inscription data received:', $request->all());

            // Convert country and stake names to IDs if they are strings
            $data = $request->all();
            $data = $this->convertNamesToIds($data);

            // Debug: Log the converted data
            \Log::info('Pre-inscription data after conversion:', $data);

            $validator = Validator::make($data, [
                'first_name' => 'required|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'required|string|max:50',
                'second_last_name' => 'nullable|string|max:50',
                'gender' => 'required|integer|in:' . implode(',', GenderEnum::values()),
                'age' => 'required|integer|min:18|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'required|email|max:100|unique:pre_inscriptions',
                'marital_status' => 'required|integer|in:' . implode(',', MaritalStatusEnum::values()),
                'served_mission' => 'required|boolean',
                'currently_working' => 'nullable|boolean',
                'job_type_preference' => 'nullable|integer|in:' . implode(',', CourseModalityEnum::values()),
                'available_full_time' => 'nullable|boolean',
                'status' => 'nullable|integer|in:' . implode(',', RequestStatusEnum::values()),
                'comments' => 'nullable|string',
                'declined_reason' => 'nullable|integer|in:' . implode(',', ReferenceStatusEnum::values()),
                'country_id' => 'required|exists:countries,id',
                'stake_id' => 'required|exists:stakes,id',
            ]);

            if ($validator->fails()) {
                // For Inertia requests, return back with errors
                return back()->withErrors($validator->errors());
            }

            $preInscription = PreInscription::create($validator->validated());

            // For Inertia requests, redirect with success message
            return redirect()->back()->with('success', 'Pre-inscripción creada exitosamente');

        } catch (Exception $e) {
            \Log::error('Error creating pre-inscription:', ['error' => $e->getMessage()]);

            // For Inertia requests, return back with error
            return back()->withErrors(['error' => 'Error al crear la pre-inscripción: ' . $e->getMessage()]);
        }
    }

    /**
     * Convert country and stake names to IDs if they are strings
     */
    private function convertNamesToIds(array $data): array
    {
        // Convert country name to ID if it's a string
        if (isset($data['country_id']) && !is_numeric($data['country_id'])) {
            $country = Country::where('name', $data['country_id'])->first();
            $data['country_id'] = $country ? $country->id : 1; // Default to ID 1 if not found
        }

        // Convert stake name to ID if it's a string
        if (isset($data['stake_id']) && !is_numeric($data['stake_id'])) {
            $stake = Stake::where('name', $data['stake_id'])->first();
            $data['stake_id'] = $stake ? $stake->id : 1; // Default to ID 1 if not found
        }

        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $preInscription = PreInscription::with(['country', 'stake'])->findOrFail($id);
            return response()->json($preInscription);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving pre-inscription',
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
            $preInscription = PreInscription::findOrFail($id);
            $validated = $request->validate([
                'status' => 'required|in:' . implode(',', RequestStatusEnum::values()),
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
                    'string',
                    function ($attribute, $value, $fail) use ($request) {
                        if ((int)$request->input('status') === 3 && empty($value)) {
                            $fail('El campo descripción de rechazo es obligatorio cuando el estatus es 3.');
                        }
                    },
                ],
                'comments' => 'nullable|string',
            ]);

            $validated['modified_by'] = Auth::id();

            $preInscription->update($validated);
            $preInscription->save();

            return redirect()->back()
                ->with('success', 'Pre-inscripción actualizada exitosamente');
        } catch (Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreInscription $preInscription)
    {
        try {
            $preInscription->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pre-inscription deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting pre-inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
