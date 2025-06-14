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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Exception;

class PreInscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $preInscriptions = PreInscription::with(['country', 'stake'])->get();
            return response()->json($preInscriptions);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving pre-inscriptions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
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
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $preInscription = PreInscription::create($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Pre-inscription created successfully',
                'data' => $preInscription
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating pre-inscription',
                'error' => $e->getMessage()
            ], 500);
        }
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
            $validated = Validator::make($request->all(), [
                'first_name' => 'required|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'required|string|max:50',
                'second_last_name' => 'nullable|string|max:50',
                'gender' => 'required|integer|in:' . implode(',', GenderEnum::values()),
                'age' => 'required|integer|min:18|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'required|email|max:100|unique:pre_inscriptions, email' . $id,
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

            $preInscription = PreInscription::findOrFail($id);

            $preInscription->update($validated->validated());

            return response()->json([
                'success' => true,
                'message' => 'Pre-inscription updated successfully',
                'data' => $preInscription
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating pre-inscription',
                'error' => $e->getMessage()
            ], 500);
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
