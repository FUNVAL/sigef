<?php

namespace App\Http\Controllers;

use App\Models\PreInscription;
use App\Models\Country;
use App\Models\Stake;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\MissionStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\JobTypeEnum;
use App\Enums\ReferenceStatusEnum;
use App\Models\Course;
use App\Notifications\RequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;
use Illuminate\Validation\ValidationException;

class PreInscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $isAdmin = $user->hasRole('Administrador');
            $query = PreInscription::query()->with(['country', 'stake'])->orderBy('created_at', 'desc');

            if ($user->hasRole('Responsable') && !$isAdmin) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $status = request()->input('status') ?? 0;
            if ($status != 0) {
                $query->where('status', $status);
            }

            $responsable = request()->input('responsable');
            if ($responsable && $isAdmin) {
                $stakesIds = Stake::where('user_id', $responsable)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $responsables = !$isAdmin ? null :
                \App\Models\User::role('Responsable')
                ->get()
                ->map(fn($u) => [
                    'id' => $u->id,
                    'name' => $u->full_name,
                ])
                ->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)
                ->values()
                ->toArray();

            return Inertia::render('pre-registration/pre-inscription', [
                'preInscriptions' => $query->get(),
                'responsables' => $responsables,
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
                'additional_phone' => 'nullable|string|max:20',
                'email' => 'required|email|max:100|unique:pre_inscriptions',
                'marital_status' => 'required|numeric|in:' . implode(',', MaritalStatusEnum::values()),
                'served_mission' => 'required|numeric|in:' . implode(',', MissionStatusEnum::values()),
                'status' => 'nullable|numeric|in:' . implode(',', RequestStatusEnum::values()),
                'comments' => 'nullable|string',
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
                    'declined_reason' => ReferenceStatusEnum::NO_APPLY->value,
                    'comments' => 'Preinscripción filtrada automáticamente, no cumple con los requisitos.',
                    'modified_by' => 0
                ]);
            }
            $stake = Stake::find($validated['stake_id']);
            $user = $stake->user;
            $user->notify(new RequestNotification($this->buildReferenceNotification($user, $preInscription)));

            return  back()->with('success', $message);
        } catch (Exception $e) {

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
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $preInscription = PreInscription::with(['country', 'stake'])->findOrFail($id);

            return Inertia::render('forms/pre-inscription-edit-form', [
                'preInscription' => $preInscription,
                'countries' => Country::all(),
                'courses' => Course::all()
            ]);
        } catch (\Exception $e) {
            return redirect()->route('pre-inscription.index')
                ->withErrors(['error' => 'Error al obtener la pre-inscripción para editar: ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $preInscription = PreInscription::findOrFail($id);
            $status = (int)$request->input('status');

            $rules = [
                'status' => 'required|in:' . implode(',', RequestStatusEnum::values()),
            ];

            if ($status !== RequestStatusEnum::APPROVED->value) {
                $rules['declined_reason'] = 'required|numeric|in:' . implode(',', ReferenceStatusEnum::values());

                $rules['declined_description'] = 'required|string';
            } else {
                $rules['declined_description'] = 'nullable|string';
            }

            $messages = [
                'declined_reason.in' => 'El motivo es obligatorio para este estado.',
                'declined_description.required' => 'El campo comentarios es obligatorio.',
            ];
            $validated = $request->validate($rules, $messages);

            $validated['modified_by'] = Auth::id();


            if (isset($validated['status']) && $validated['status'] === RequestStatusEnum::APPROVED->value) {
                $validated['declined_reason'] = null;
            }

            $preInscription->update($validated);
            $preInscription->save();

            return redirect()->back()
                ->with('success', 'Pre-inscripción actualizada exitosamente');
        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (Exception $e) {

            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Update the pre-inscription data (not status)
     */
    public function updatePreInscription(Request $request, $id)
    {
        try {
            $preInscription = PreInscription::findOrFail($id);

            $rules = [
                'first_name' => 'required|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'required|string|max:50',
                'second_last_name' => 'nullable|string|max:50',
                'gender' => 'required|numeric|in:' . implode(',', GenderEnum::values()),
                'age' => 'required|numeric|min:18|max:100',
                'phone' => 'required|string|max:20',
                'additional_phone' => 'nullable|string|max:20',
                'email' => 'required|email|max:100|unique:pre_inscriptions,email,' . $id,
                'marital_status' => 'required|numeric|in:' . implode(',', MaritalStatusEnum::values()),
                'served_mission' => 'required|numeric|in:' . implode(',', MissionStatusEnum::values()),
                'country_id' => 'required|exists:countries,id',
                'stake_id' => 'required|exists:stakes,id',
                'currently_working' => 'nullable|boolean',
                'job_type_preference' => 'nullable|numeric|in:' . implode(',', JobTypeEnum::values()),
                'available_full_time' => 'nullable|boolean',
            ];

            $validated = $request->validate($rules);
            $validated['modified_by'] = Auth::id();

            $preInscription->update($validated);

            return redirect()->route('pre-inscription.index')
                ->with('success', 'Pre-inscripción actualizada exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
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

    /**
     * Get the pre-inscription dashboard data.
     */
    public function dashboard()
    {
        try {
            $user = Auth::user();
            $query = PreInscription::query()->with(['country', 'stake']);

            if ($user->hasRole('Responsable') && !$user->hasRole('Administrador')) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $preInscriptions = $query->get();
            $total = $preInscriptions->count();

            // General statistics
            $pending = $preInscriptions->where('status.id', RequestStatusEnum::PENDING->value)->count();
            $accepted = $preInscriptions->where('status.id', RequestStatusEnum::APPROVED->value)->count();
            $rejected = $preInscriptions->where('status.id', RequestStatusEnum::REJECTED->value)->count();
            $acceptancePercentage = $total > 0 ? round(($accepted / $total) * 100, 1) : 0;
            // Pre-inscriptions this week
            $newThisWeek = $preInscriptions->where('created_at', '>=', now()->startOfWeek())->count();

            $stats = [
                'total' => $total,
                'pending' => $pending,
                'accepted' => $accepted,
                'rejected' => $rejected,
                'acceptancePercentage' => $acceptancePercentage,
                'newThisWeek' => $newThisWeek,
            ];

            // Pre-inscriptions by country
            $preInscriptionsByCountry = $preInscriptions->groupBy('country.name')
                ->map(function ($group, $country) use ($total) {
                    $quantity = $group->count();
                    return [
                        'country' => $country ?? 'No Country',
                        'quantity' => $quantity,
                        'percentage' => $total > 0 ? round(($quantity / $total) * 100, 1) : 0
                    ];
                })
                ->sortByDesc('quantity')
                ->values()
                ->toArray();

            // Pre-inscriptions by stake
            $preInscriptionsByStake = $preInscriptions->groupBy('stake.name')
                ->map(function ($group, $stake) use ($total) {
                    $quantity = $group->count();
                    return [
                        'stake' => $stake ?? 'No Stake',
                        'quantity' => $quantity,
                        'percentage' => $total > 0 ? round(($quantity / $total) * 100, 1) : 0
                    ];
                })
                ->sortByDesc('quantity')
                ->values()
                ->toArray();

            return Inertia::render('pre-registration/pre-inscriptions-dashboard', [
                'data' => [
                    'stats' => $stats,
                    'preInscriptionsByCountry' => $preInscriptionsByCountry,
                    'preInscriptionsByStake' => $preInscriptionsByStake
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el dashboard de pre-inscripciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function generateMessage($currentlyWorking, $jobTypePreference, $availableFullTime, $gender): array
    {
        $response = [
            'message' => __('common.messages.success.preinscription_success'),
            'type' => 'success'
        ];

        if ($gender === GenderEnum::FEMALE->value) {
            if ($currentlyWorking) {
                $response['message'] = __('common.messages.rejections.working');
                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::OWN_BOSS->value) {
                $response['message'] = __('common.messages.rejections.entrepreneur');
                $response['type'] = 'rejected';
            } elseif ($jobTypePreference === JobTypeEnum::ONLINE->value && !$availableFullTime) {
                $response['message'] = __('common.messages.rejections.online_part_time');
                $response['type'] = 'rejected';
            } elseif (!$availableFullTime) {
                $response['message'] = __('common.messages.rejections.part_time');
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
            $message = str_replace('[**]', $responsablePhone, __('common.messages.duplicates.pending'));

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

            $message = str_replace('[**]', $msg['message'], __('common.messages.duplicates.rejected'));

            return [
                'exists' => true,
                'message' => [
                    'type' => $msg['type'],
                    'message' => $message
                ]
            ];
        }

        return [
            'exists' => true,
            'message' => [
                'type' => 'rejected',
                'message' => __('common.messages.error.email_exists')
            ]
        ];
    }

    /**
     * Get the attributes for the reference notification.
     */
    private function buildReferenceNotification($user, $reference): array
    {
        return [
            'greeting' => 'Estimado ' . $user->full_name,
            'subject' => 'Nueva Preinscrición: ' . $reference->name,
            'mensaje' => 'Te informamos que tienes un nuevo preinscrito pendiente de revisión.
             Por favor, acceda al sistema para consultar los detalles y tomar la acción correspondiente.',
            'salutation' =>  'Atentamente: Sistema Integral de Gestión Educativa FUNVAL',
            'action' => [
                'text' => '👉 Ver Preinscrición',
                'url' => route('pre-inscription.index'),
            ],
        ];
    }
}
