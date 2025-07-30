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
            // Validación manual del correo
            $emailCheck = $this->checkEmailPreInscription($request->input('email'));
            if ($emailCheck['exists']) {
                $queryParams = array_merge($request->query(), ['step' => 5]);
                $previousUrl = url()->previous();
                $previousUrl = preg_replace('/([&?]step=\d+)/', '', $previousUrl);
                return redirect()->to($previousUrl . '?' . http_build_query($queryParams))
                    ->withInput()
                    ->with('success',  $emailCheck['message']);
            }

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
            'message' => "<strong>¡Gracias por tu aplicación!</strong><br/>Uno de nuestros representantes se pondrá en contacto contigo en las próximas 72 horas para brindarte toda la información sobre el programa y resolver cualquier duda que puedas tener.<br/><br/>Agradecemos tu interés y estamos emocionados de acompañarte en este proceso.",
            'type' => 'success'
        ];
        if ($gender === GenderEnum::FEMALE->value) {
            if ($currentlyWorking) {

                $response['message'] = "<strong>Gracias por tu interés en el programa de FUNVAL.</strong><br/> Debido a la naturaleza intensiva de nuestras capacitaciones, este programa está dirigido a personas que actualmente no tienen empleo.<br/><br/> Si en el futuro te encuentras en búsqueda de un empleo, no dudes en contactarnos nuevamente.<br/><br/> Además, te compartimos los siguientes enlaces sobre organizaciones aliadas a Funval que podrían ser de tu interés:
                <a href=\"https://www.the-academy.org/contact/\" target=\"_blank\" class=\"text-blue-600 underline\">La Academia</a> y 
                <a href=\"https://mentorseducation.org/\" target=\"_blank\" class=\"text-blue-600 underline\">Mentors</a>.";

                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::OWN_BOSS->value) {

                $response['message'] = "<strong>¡Excelente!</strong><br/>Muy pronto recibirás información de nuestras organizaciones aliadas especializadas en emprendimiento, quienes comparten con FUNVAL el compromiso de impulsar nuevas oportunidades para personas como tú.<br/><br/>
                Visita los siguientes enlaces para obtener más información sobre dichas organizaciones: <a href=\"https://www.the-academy.org/contact/\" target=\"_blank\" class=\"text-blue-600 underline\">La Academia</a> y <a href=\"https://mentorseducation.org/\" target=\"_blank\" class=\"text-blue-600 underline\">Mentors</a>.";

                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::ONLINE->value && !$availableFullTime) {
                $response['message'] = "<strong>FUNVAL mantiene alianzas con empresas que requieren modalidad de trabajo presencial.</strong><br/> Si en el futuro esta opción se ajusta a tu situación, no dudes en contactarnos nuevamente. Estaremos encantados de apoyarte en tu proceso de búsqueda laboral.<br/><br/>Además, te compartimos los siguientes enlaces sobre organizaciones aliadas a Funval que podrían ser de tu interés: <a href=\"https://www.the-academy.org/contact/\" target=\"_blank\" class=\"text-blue-600 underline\">La Academia</a> y <a href=\"https://mentorseducation.org/\" target=\"_blank\" class=\"text-blue-600 underline\">Mentors</a>.";

                $response['type'] = 'rejected';
            } elseif (!$availableFullTime) {
                $response['message'] = "<strong>Debido a la intensidad de los programas de FUNVAL</strong>, se requiere que los participantes cuenten con una conexión continua  y estén disponibles sin realizar otras actividades en paralelo durante el horario de capacitación.<br/><br/>Si en el futuro esta opción se ajusta a tu situación, no dudes en contactarnos nuevamente. Estaremos encantados de apoyarte en tu proceso de búsqueda laboral.<br/><br/>Además, te compartimos la siguiente información sobre organizaciones aliadas a FUNVAL que pueden ser de tu interés:<a href=\"https://www.the-academy.org/contact/\" target=\"_blank\" class=\"text-blue-600 underline\">La Academia</a> y <a href=\"https://mentorseducation.org/\" target=\"_blank\" class=\"text-blue-600 underline\">Mentors</a>.";
                $response['type'] = 'rejected';
            }
        }
        return $response;
    }

    /**
     * Verifica si el correo ya existe y retorna un mensaje personalizado si aplica.
     */
    private function checkEmailPreInscription($email)
    {
        $preInscription = PreInscription::where('email', $email)->first();
        if (!$preInscription) {
            return ['exists' => false];
        }

        $statusId = is_array($preInscription->status) ? $preInscription->status["id"] : $preInscription->status;
        $genderId = is_array($preInscription->gender) ? $preInscription->gender["id"] : $preInscription->gender;
        $jobTypePref = is_array($preInscription->job_type_preference ?? null) ? $preInscription->job_type_preference["id"] : ($preInscription->job_type_preference ?? null);

        $responsablePhone = optional(optional($preInscription->stake)->user)->contact_phone_1;
        if ($statusId == RequestStatusEnum::PENDING->value) {

            $message = "<strong>Ya existe una solicitud pendiente asociada a este correo electrónico.</strong><br/> 
                        Por favor, espera a que uno de nuestros representantes se comunique contigo. El plazo estimado de contacto es de hasta 72 horas.<br/><br/> Si ya ha transcurrido ese tiempo y aún no has recibido respuesta, puedes escribirnos al siguiente número: $responsablePhone.<br/><br/>Agradecemos tu paciencia y tu interés en el programa.";

            return [
                'exists' => true,
                'message' => [
                    'type' => 'rejected',
                    'message' => $message
                ]
            ];
        }

        if (
            $statusId == RequestStatusEnum::REJECTED->value &&
            $genderId == GenderEnum::FEMALE->value
        ) {
            $msg = $this->generateMessage(
                $preInscription->currently_working,
                $jobTypePref,
                $preInscription->available_full_time,
                $genderId
            );
            return [
                'exists' => true,
                'message' => [
                    'type' => $msg['type'],
                    'message' => "<strong>Este correo ya ha sido registrado previamente.</strong><br/> 
                                Hemos identificado que ya existe una solicitud asociada a este correo electrónico, la cual fue evaluada anteriormente con el siguiente resultado:<br/><br/>" . $msg['message']
                ]
            ];
        }

        return [
            'exists' => true,
            'message' => [
                'type' => 'rejected',
                'message' => "Ya existe una solicitud con este correo electrónico."
            ]
        ];
    }
}
