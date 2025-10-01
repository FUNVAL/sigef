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
use App\Enums\StatusEnum;
use App\Models\Course;
use App\Models\User;
use App\Notifications\RequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;
use Illuminate\Validation\ValidationException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PreInscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $all = $user->can('ver todas las preinscripciones');
            $own = $user->can('ver preinscripciones propias');
            $staff = $user->can('ver preinscripciones del personal');

            if (!$all && !$own && !$staff) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción. Si crees que esto es un error, contacta al administrador del sistema.');
            }

            $query = PreInscription::query()->with(['country', 'stake', 'course'])->orderBy('created_at', 'desc');

            if ($request->has('search') && $request->input('search') !== '') {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('middle_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere('second_last_name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            }

            if ($own && !$all) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $status = $request->input('status') ?? 0;
            if ($status != 0) {
                $query->where('status', $status);
            }

            $responsable = $request->input('responsable');
            if ($responsable && $all) {
                $stakesIds = Stake::where('user_id', $responsable)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $country = $request->input('country') ?? 0;
            if ($country != 0) {
                $query->where('country_id', $country);
            }

            $stake = $request->input('stake') ?? 0;
            $stakes = $country != 0 ?
                Stake::where('country_id', $country)
                ->where('status', StatusEnum::ACTIVE->value)
                ->get() : [];

            if ($stake != 0 && $country != 0) {
                $query->where('stake_id', $stake);
            }

            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            $preInscriptions = $query->paginate($perPage, ['*'], 'page', $page);

            $responsables = !$all ? null :
                User::permission('recibir asignaciones de estacas')
                ->get()
                ->map(fn($u) => [
                    'id' => $u->id,
                    'name' => $u->full_name,
                ])
                ->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)
                ->values()
                ->toArray();

            $countries = Country::where('status', StatusEnum::ACTIVE->value)->get();


            return Inertia::render('pre-registration/pre-inscription', [
                'preInscriptions' => $preInscriptions,
                'responsables' => $responsables,
                'countries' => $countries,
                'stakes' => $stakes,
                'pagination' => [
                    'current_page' => $preInscriptions->currentPage(),
                    'per_page' => $preInscriptions->perPage(),
                    'total' => $preInscriptions->total(),
                    'last_page' => $preInscriptions->lastPage(),
                ],
                'filters' => $request->only(['search', 'status', 'responsable', 'country', 'stake']),
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
                'countries' => Country::where('status', StatusEnum::ACTIVE->value)->get(),
                'courses' => Course::where('status', StatusEnum::ACTIVE->value)->get()
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
            $emailCheck = $this->checkEmailPreInscription($request->input('email'), $request);
            if ($emailCheck['exists']) {
                return back()->with('success', $emailCheck['message']);
            }

            $validated = $this->validatePreInscriptionData($request);
            $preInscription = PreInscription::create($validated);

            // Aplicar filtros automáticos y obtener mensaje
            $filterResult = $this->applyAutomaticFilters($preInscription, $request);

            if ($filterResult['shouldReject']) {
                $preInscription->update([
                    'status' => RequestStatusEnum::REJECTED->value,
                    'declined_reason' => ReferenceStatusEnum::FILTERED->value,
                    'declined_description' => 'Preinscripción filtrada automáticamente, no cumple con los requisitos.',
                    'modified_by' => 0
                ]);
            }

            # if APP_ENV is production, send notification to the stake responsible
            if (config('app.env') === 'production') {
                $this->sendNotificationToResponsible($preInscription);
            }

            return back()->with('success', $filterResult['message']);
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la preinscripción: ' . $e->getMessage()]);
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
                'countries' => Country::where('status', StatusEnum::ACTIVE->value)->get(),
                'courses' => Course::where('status', StatusEnum::ACTIVE->value)->get()
            ]);
        } catch (\Exception $e) {
            return redirect()->route('pre-inscription.index')
                ->withErrors(['error' => 'Error al obtener la preinscripción para editar: ' . $e->getMessage()]);
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
                ->with('success', 'Preinscripción actualizada exitosamente');
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
                'course_id' => 'required|exists:courses,id',
                'has_children' => 'required|boolean', // ✅ AGREGAR esta línea
            ];

            $validated = $request->validate($rules);
            $validated['modified_by'] = Auth::id();

            $preInscription->update($validated);

            return redirect()->route('pre-inscription.index')
                ->with('success', 'Preinscripción actualizada exitosamente');
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
                'message' => 'Preinscription deleted successfully'
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
    public function dashboard(Request $request)
    {
        try {
            $user = Auth::user();

            $all = $user->can('ver todas las preinscripciones');
            $own = $user->can('ver preinscripciones propias');
            $staff = $user->can('ver preinscripciones del personal');

            if (!$all && !$own && !$staff) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción. Si crees que esto es un error, contacta al administrador del sistema.');
            }

            $query = PreInscription::query()->with(['country', 'stake.user']);

            if ($own && !$all) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $preInscriptions = $query->get();
            $total = $preInscriptions->count();

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

            // Pre-inscriptions by recruiter (pendientes) con filtro de país opcional
            $recruiterQuery = $preInscriptions->where('status.id', RequestStatusEnum::PENDING->value);

            // Aplicar filtro de país si se proporciona y el usuario tiene permisos
            if ($all && $request->has('country') && $request->get('country') !== '') {
                $countryId = (int) $request->get('country');
                $recruiterQuery = $recruiterQuery->where('country.id', $countryId);
            }

            $preInscriptionsByRecruiter = $recruiterQuery->groupBy('stake.user.firstname', 'stake.user.lastname', 'stake.user.id')
                ->map(function ($group, $key) use ($recruiterQuery) {
                    $quantity = $group->count();
                    $filteredTotal = $recruiterQuery->count();

                    // Obtener info del reclutador del primer elemento del grupo
                    $firstItem = $group->first();
                    $recruiterName = 'Sin asignar';

                    if ($firstItem && $firstItem->stake && $firstItem->stake->user) {
                        $user = $firstItem->stake->user;
                        $recruiterName = trim($user->firstname . ' ' . $user->lastname);
                    }

                    return [
                        'recruiter' => $recruiterName,
                        'quantity' => $quantity,
                        'percentage' => $filteredTotal > 0 ? round(($quantity / $filteredTotal) * 100, 1) : 0
                    ];
                })
                ->sortByDesc('quantity')
                ->values()
                ->toArray();

            // Pre-inscriptions by stake (para usuarios sin permiso view-all)
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

            // Obtener países solo si el usuario tiene permisos para ver todo
            $countries = $all ? Country::where('status', StatusEnum::ACTIVE->value)->get(['id', 'name']) : [];

            return Inertia::render('pre-registration/pre-inscriptions-dashboard', [
                'data' => [
                    'stats' => $stats,
                    'preInscriptionsByCountry' => $preInscriptionsByCountry,
                    'preInscriptionsByRecruiter' => $preInscriptionsByRecruiter,
                    'preInscriptionsByStake' => $preInscriptionsByStake,
                    'countries' => $countries,
                    'canViewAll' => $all
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el dashboard de preinscripciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Export pending pre-inscriptions to Excel using template
     */
    public function exportPendingToExcel()
    {
        try {
            $user = Auth::user();
            $all = $user->can('ver todas las preinscripciones');
            $own = $user->can('ver preinscripciones propias');
            $staff = $user->can('ver preinscripciones del personal');

            if (!$all && !$own && !$staff) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción.');
            }

            // Obtener preinscripciones pendientes
            $query = PreInscription::query()
                ->with(['country', 'stake', 'course'])
                ->where('status', RequestStatusEnum::PENDING->value);

            if ($own && !$all) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $preInscriptions = $query->orderBy('created_at', 'desc')->get();

            // Cargar el template específico para preinscripciones
            $templatePath = base_path('statics/template-preinscription.xlsx');
            if (!file_exists($templatePath)) {
                return back()->withErrors(['error' => 'Template de preinscripciones no encontrado.']);
            }

            $spreadsheet = IOFactory::load($templatePath);
            $worksheet = $spreadsheet->getActiveSheet();

            // Agregar datos a partir de la fila 5 (después de los headers del template)
            $row = 5;
            foreach ($preInscriptions as $preInscription) {
                // Columna B: Nombre completo (Candidato)
                $fullName = trim($preInscription->first_name . ' ' .
                    ($preInscription->middle_name ? $preInscription->middle_name . ' ' : '') .
                    $preInscription->last_name . ' ' .
                    ($preInscription->second_last_name ? $preInscription->second_last_name : ''));
                $worksheet->setCellValue('B' . $row, $fullName);

                // Columna C: Género
                $worksheet->setCellValue('C' . $row, $preInscription->gender['name'] ?? 'N/A');

                // Columna D: Edad
                $worksheet->setCellValue('D' . $row, $preInscription->age);

                // Columna E: Correo
                $worksheet->setCellValue('E' . $row, $preInscription->email);

                // Columna F: Número de teléfono
                $phoneNumbers = $preInscription->phone;
                if ($preInscription->additional_phone) {
                    $phoneNumbers .= ' / ' . $preInscription->additional_phone;
                }
                $worksheet->setCellValue('F' . $row, $phoneNumbers);

                // Columna G: País
                $worksheet->setCellValue('G' . $row, $preInscription->country->name ?? 'N/A');

                // Columna H: Estaca o distrito
                $worksheet->setCellValue('H' . $row, $preInscription->stake->name ?? 'N/A');

                // Columna I: Estado Civil
                $worksheet->setCellValue('I' . $row, $preInscription->marital_status['name'] ?? 'N/A');

                // Columna J: Sirvió misión
                $worksheet->setCellValue('J' . $row, $preInscription->served_mission['name'] ?? 'N/A');

                // Columna K: Curso
                $worksheet->setCellValue('K' . $row, $preInscription->course->name ?? 'N/A');

                // Columna L: Fecha de registro
                $worksheet->setCellValue('L' . $row, $preInscription->created_at->format('d/m/Y'));

                $row++;
            }

            // Generar el archivo
            $writer = new Xlsx($spreadsheet);
            $filename = 'preinscripciones_pendientes_' . date('Y-m-d_H-i-s') . '.xlsx';
            $tempPath = storage_path('app/temp/' . $filename);

            // Crear directorio si no existe
            if (!file_exists(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0755, true);
            }

            $writer->save($tempPath);

            return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error al generar el archivo Excel: ' . $e->getMessage()]);
        }
    }

    /**
     * Valida los datos de preinscripción según las reglas de negocio
     */
    private function validatePreInscriptionData(Request $request): array
    {
        $isWoman = $request->input('gender') === GenderEnum::FEMALE->value;

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
            'country_id' => 'required|exists:countries,id',
            'stake_id' => 'required|exists:stakes,id',
            'course_id' => 'required|exists:courses,id',
            'has_children' => 'required|boolean',
        ];

        if ($isWoman) {
            $rules['currently_working'] = 'required|boolean';

            if (!$request->input('currently_working')) {
                $rules['job_type_preference'] = 'required|numeric|in:' . implode(',', JobTypeEnum::values());
            }

            if ($request->input('job_type_preference') === JobTypeEnum::IN_PERSON->value) {
                $rules['available_full_time'] = 'required|boolean';
            }
        }

        return $request->validate($rules);
    }

    /**
     * Aplica filtros automáticos para determinar elegibilidad
     */
    private function applyAutomaticFilters($preInscription, Request $request): array
    {
        // Verificar elegibilidad de mujeres
        $womanEligibilityCheck = $this->checkWomanEligibility(
            $request->input('gender'),
            $request->input('currently_working'),
            $request->input('job_type_preference'),
            $request->input('available_full_time')
        );

        if (!$womanEligibilityCheck['eligible']) {
            return [
                'shouldReject' => true,
                'message' => $womanEligibilityCheck['message'],
                'reason' => ReferenceStatusEnum::FILTERED->value
            ];
        }

        // ✅ AGREGAR: Verificar elegibilidad para misión
        $missionEligibilityCheck = $this->missionEligibility(
            $request->input('age'),
            $request->input('marital_status'),
            $request->input('served_mission'),
            $request->input('has_children', false),
            $request->input('gender')
        );

        if (!$missionEligibilityCheck['eligible']) {
            return [
                'shouldReject' => true,
                'message' => $missionEligibilityCheck['message'],
                'reason' => ReferenceStatusEnum::FUTURE_MISSIONARY->value
            ];
        }

        return [
            'shouldReject' => false,
            'message' => $womanEligibilityCheck['message']
        ];
    }

    /**
     * Verifica elegibilidad de mujeres según reglas de negocio (lógica centralizada)
     */
    private function checkWomanEligibility($gender, $currentlyWorking, $jobTypePreference, $availableFullTime): array
    {
        if ($gender !== GenderEnum::FEMALE->value) {
            return [
                'eligible' => true,
                'message' => [
                    'type' => 'success',
                    'message' => __('common.messages.success.preinscription_success')
                ]
            ];
        }

        // Verificar condiciones de rechazo para mujeres
        if ($currentlyWorking) {
            return [
                'eligible' => false,
                'message' => [
                    'type' => 'rejected',
                    'message' => __('common.messages.rejections.working')
                ]
            ];
        }

        if ($jobTypePreference === JobTypeEnum::OWN_BOSS->value) {
            return [
                'eligible' => false,
                'message' => [
                    'type' => 'rejected',
                    'message' => __('common.messages.rejections.entrepreneur')
                ]
            ];
        }

        if ($jobTypePreference === JobTypeEnum::ONLINE->value && !$availableFullTime) {
            return [
                'eligible' => false,
                'message' => [
                    'type' => 'rejected',
                    'message' => __('common.messages.rejections.online_part_time')
                ]
            ];
        }

        if ($jobTypePreference === JobTypeEnum::IN_PERSON->value && !$availableFullTime) {
            return [
                'eligible' => false,
                'message' => [
                    'type' => 'rejected',
                    'message' => __('common.messages.rejections.part_time')
                ]
            ];
        }

        return [
            'eligible' => true,
            'message' => [
                'type' => 'success',
                'message' => __('common.messages.success.preinscription_success')
            ]
        ];
    }

    /**
     * Envía notificación al responsable de la estaca
     */
    private function sendNotificationToResponsible($preInscription): void
    {
        $stake = Stake::find($preInscription->stake_id);
        if ($stake && $stake->user) {
            $stake->user->notify(new RequestNotification($this->buildReferenceNotification($stake->user, $preInscription)));
        }
    }

    /**
     * Extrae el valor del enum (maneja tanto arrays como valores directos)
     */
    private function getEnumValue($value)
    {
        return is_array($value) ? $value["id"] : $value;
    }

    /**
     * Verifica si el correo ya existe y retorna un mensaje personalizado si aplica.
     */
    private function checkEmailPreInscription($email, $request)
    {
        $preInscription = PreInscription::where('email', $email)->first();

        if (!$preInscription) {
            return ['exists' => false];
        }

        $moreThanSixMonths = $preInscription->updated_at->lt(now()->subMonths(6));
        $statusId = $this->getEnumValue($preInscription->status);
        $responsablePhone = optional(optional($preInscription->stake)->user)->contact_phone_1;

        // Caso: Preinscripción pendiente
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

        // Caso: Preinscripción rechazada hace más de 6 meses (reintento)
        if ($moreThanSixMonths && $statusId == RequestStatusEnum::REJECTED->value) {
            return $this->handleRetryAfterSixMonths($preInscription, $request);
        }

        // Caso: Preinscripción rechazada (mostrar motivo anterior)
        if ($statusId == RequestStatusEnum::REJECTED->value) {
            return $this->handleRejectedPreInscription($preInscription);
        }

        // Caso por defecto: email ya existe
        return [
            'exists' => true,
            'message' => [
                'type' => 'rejected',
                'message' => __('common.messages.error.email_exists')
            ]
        ];
    }

    /**
     * Maneja reintento después de 6 meses
     */
    private function handleRetryAfterSixMonths($preInscription, $request): array
    {
        $eligibilityCheck = $this->checkWomanEligibility(
            $request->input('gender'),
            $request->input('currently_working'),
            $request->input('job_type_preference'),
            $request->input('available_full_time')
        );
        $validated = $this->validatePreInscriptionData($request);
        if ($eligibilityCheck['eligible']) {
            $preInscription->update([
                ...$validated,
                'status' => RequestStatusEnum::PENDING->value,
                'declined_reason' => null,
                'declined_description' => null,
                'created_at' => now(),
                'modified_by' => null
            ]);
        }

        return [
            'exists' => true,
            'message' => $eligibilityCheck['message']
        ];
    }

    /**
     * Maneja preinscripción previamente rechazada
     */
    private function handleRejectedPreInscription($preInscription): array
    {
        $genderId = $this->getEnumValue($preInscription->gender);

        if ($genderId == GenderEnum::FEMALE->value) {
            $jobTypePref = $this->getEnumValue($preInscription->job_type_preference);
            $eligibilityCheck = $this->checkWomanEligibility(
                $genderId,
                $preInscription->currently_working,
                $jobTypePref,
                $preInscription->available_full_time
            );

            $rejectedMessage = "<div class='bg-blue-200/30 rounded-md p-2'>" . $eligibilityCheck['message']['message'] . "</div>";
            $message = str_replace('[**]', $rejectedMessage, __('common.messages.duplicates.rejected'));

            return [
                'exists' => true,
                'message' => [
                    'type' => $eligibilityCheck['message']['type'],
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
            'subject' => 'Nueva Preinscripción: ' . $reference->name,
            'mensaje' => <<<'EOT'
            Te informamos que tienes un nuevo preinscrito pendiente de revisión.
            Por favor, acceda al sistema para consultar los detalles y tomar la acción correspondiente.
            EOT,
            'salutation' =>  'Atentamente: Sistema Integral de Gestión Educativa FUNVAL',
            'action' => [
                'text' => '👉 Ver Preinscripción',
                'url' => route('pre-inscription.index'),
            ],
        ];
    }

    /**
     * Verifica elegibilidad para misión según edad, estado civil y otros criterios
     * 
     * Reglas:
     * - Hombres: < 25 años
     * - Mujeres: < 29 años  
     * - Deben ser solteros SIN hijos O haber servido misión O estar sirviendo actualmente
     */
    private function missionEligibility(
        $age,
        $maritalStatus,
        $servedMission,
        $hasChildren,
        $gender
    ): array {
        $ageLimit = $gender == GenderEnum::FEMALE->value ? 29 : 25;

        // Si es mayor al límite de edad, es elegible
        if ($age >= $ageLimit) {
            return [
                'eligible' => true,
                'message' => [
                    'type' => 'success',
                    'message' => __('common.messages.success.mission_eligible')
                ]
            ];
        }

        // Si es menor al límite de edad, verificar condiciones adicionales
        $isSingle = $maritalStatus === MaritalStatusEnum::SINGLE->value;

        // Verificar si ya sirvió misión O está sirviendo actualmente
        $hasServedMission = $servedMission === MissionStatusEnum::YES->value ||
            $servedMission === MissionStatusEnum::CURRENTLY_SERVING->value;

        // Es elegible si: es soltero sin hijos O ya sirvió/está sirviendo misión
        if (($isSingle && !$hasChildren) || $hasServedMission) {
            return [
                'eligible' => true,
                'message' => [
                    'type' => 'success',
                    'message' => __('common.messages.success.mission_eligible')
                ]
            ];
        }

        // No cumple los requisitos
        return [
            'eligible' => false,
            'message' => [
                'type' => 'rejected',
                'message' => __('common.messages.rejections.mission_not_eligible')
            ]
        ];
    }
}
