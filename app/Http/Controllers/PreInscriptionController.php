<?php

namespace App\Http\Controllers;

use App\Models\PreInscription;
use App\Models\Country;
use App\Models\Stake;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\JobTypeEnum;
use App\Enums\ReferenceStatusEnum;
use App\Models\Course;
use Illuminate\Http\Request;
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
            return inertia('forms/pre-inscription-form', [
                'step' => request()->input('step', 0),
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
            $rules = [
                'first_name' => 'required|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'required|string|max:50',
                'second_last_name' => 'nullable|string|max:50',
                'gender' => 'required|numeric|in:' . implode(',', GenderEnum::values()),
                'age' => 'required|numeric|min:18|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'required|email|max:100|unique:pre_inscriptions',
                'marital_status' => 'required|numeric|in:' . implode(',', MaritalStatusEnum::values()),
                'served_mission' => 'required|boolean',
                'status' => 'nullable|numeric|in:' . implode(',', RequestStatusEnum::values()),
                'comments' => 'nullable|string',
                'declined_reason' => 'nullable|numeric|in:' . implode(',', ReferenceStatusEnum::values()),
                'country_id' => 'required|exists:countries,id',
                'stake_id' => 'required|exists:stakes,id'
            ];

            $is_woman = $request['gender'] === GenderEnum::FEMALE->value;

            if ($is_woman) {
                $aditionalRules = [
                    'currently_working' => 'required|boolean',
                ];

                if (!$request['currently_working']) {
                    $aditionalRules['job_type_preference'] = 'required|numeric|in:' . implode(',', JobTypeEnum::values());
                }

                if ($request['job_type_preference'] === JobTypeEnum::IN_PERSON->value) {
                    $aditionalRules['available_full_time'] = 'required|boolean';
                }

                $rules = array_merge($rules, $aditionalRules);
            }


            $validated = $request->validate($rules);

            $preInscription =  PreInscription::create($validated);

            $message =  $this->generateMessage(
                $request['currently_working'],
                $request['job_type_preference'],
                $request['available_full_time'],
                $request['gender']
            );

            $is_workig = $request['currently_working'];
            $is_valid_job = $request['job_type_preference'] === JobTypeEnum::IN_PERSON->value;
            $is_available = $request['available_full_time'];

            if ($is_woman && ($is_workig || !$is_valid_job || !$is_available)) {

                $preInscription->update([
                    'status' => RequestStatusEnum::REJECTED->value,
                    'declined_reason' => ReferenceStatusEnum::FEMALE->value,
                    'comments' => 'Pre-inscripción filtrada automáticamente por criterios de género y disponibilidad laboral.',
                    'modified_by' => 0
                ]);
            }

            return  back()->with('success', $message);
        } catch (Exception $e) {

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

    private function generateMessage($currentlyWorking, $jobTypePreference, $availableFullTime, $gender): array
    {
        $response = [
            'message' => "Gracias por tu aplicacion, Uno de nuestros representante te estara contactando entre las proximas 24-72 horas para brindarte toda la información del programa.",
            'type' => 'success'
        ];
        if ($gender === GenderEnum::FEMALE->value) {
            if ($currentlyWorking) {
                $response['message'] = "Debido a las capacitaciones intensivas de Funval, el programa está dirigido a personas sin empleo. Si más adelante tienes la necesidad de un empleo no dudes en contactarnos nuevamente.";
                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::OWN_BOSS->value) {
                $response['message'] = "Excelente, pronto recibirás más información de las organizaciones aliadas con FUNVAL expertas en emprendimiento.";
                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::ONLINE->value && !$availableFullTime) {
                $response['message'] = "FUNVAL tiene alianza con empresas que requieren que las personas trabajen presencialmente. Si en el futuro esta es una opción para ti, contáctanos nuevamente.";
                $response['type'] = 'rejected';
            } elseif (!$availableFullTime) {
                $response['message'] = "Debido a la intensidad de los programas de FUNVAL se requiere una conexión continua sin realizar otras actividades durante el programa de capacitación. Si en el futuro tienes esta disponibilidad de tiempo, vuelve a contactarnos.";
                $response['type'] = 'rejected';
            }
        }
        return $response;
    }
}
