<?php

namespace App\Http\Controllers;

use App\Enums\ReferenceStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\StatusEnum;
use App\Models\Country;
use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use App\Models\Stake;
use App\Notifications\RequestNotification;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $all = $user->can('ver todas las referencias');
            $own = $user->can('ver referencias propias');
            $staff = $user->can('ver referencias del personal');

            if (!$all && !$own && !$staff) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción. Si crees que esto es un error, contacta al administrador del sistema.');
            }

            $query = Reference::query()->with(['country', 'stake', 'modifier'])->orderBy('created_at', 'desc');

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

            if (!$all && $own) {
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
            $references = $query->paginate($perPage, ['*'], 'page', $page);

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


            return Inertia::render('pre-registration/references', [
                'references' => $references,
                'responsables' => $responsables,
                'countries' => $countries,
                'stakes' => $stakes,
                'pagination' => [
                    'current_page' => $references->currentPage(),
                    'per_page' => $references->perPage(),
                    'total' => $references->total(),
                    'last_page' => $references->lastPage(),
                ],
                'filters' => $request->only(['search', 'status', 'responsable', 'country', 'stake']),
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
    public function create()
    {
        return  Inertia::render('forms/reference-form', [
            'step' => request()->input('step', 0),
            'countries' => Country::where('status', StatusEnum::ACTIVE->value)->get(),
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

            $reference = Reference::create($validated);

            $message =  [
                'type' => 'success',
                'message' =>  __('common.messages.success.reference_success'),
            ];

            $stake = Stake::find($validated['stake_id']);
            $user = $stake->user;
            $user->notify(new RequestNotification($this->buildReferenceNotification($user, $reference)));

            return  back()->with('success', $message);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $queryParams = array_merge($request->query(), ['step' => 2]);

            return redirect()->to('/reference-form' . '?' . http_build_query($queryParams))
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return back()
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
    public function edit($id)
    {
        try {
            $reference = Reference::with(['country', 'stake'])->findOrFail($id);

            return Inertia::render('forms/reference-edit-form', [
                'reference' => $reference,
                'countries' => Country::where('status', StatusEnum::ACTIVE->value)->get()
            ]);
        } catch (\Exception $e) {
            return redirect()->route('references.index')
                ->withErrors(['error' => 'Error al obtener la referencia para editar: ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $reference = Reference::findOrFail($id);
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

            if (isset($validated['status']) && $validated['status'] === RequestStatusEnum::APPROVED->value) {
                $validated['declined_reason'] = null;
            }

            $validated['modifier_id'] = Auth::id();

            $reference->update($validated);
            $reference->save();
            return redirect()->back()
                ->with('success', 'Referencia actualizada exitosamente');
        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Update the reference data (not status)
     */
    public function updateReference(Request $request, $id)
    {
        try {
            $reference = Reference::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'gender' => 'required|integer',
                'age' => 'required|integer|min:18|max:120',
                'country_id' => 'required|exists:countries,id',
                'phone' => 'nullable|string|max:20',
                'stake_id' => 'required|exists:stakes,id',
                'referrer_name' => 'nullable|string|max:255',
                'referrer_phone' => 'nullable|string|max:20',
                'relationship_with_referred' => 'nullable|numeric',
            ]);

            $validated['modifier_id'] = Auth::id();

            $reference->update($validated);

            return redirect()->route('references.index')
                ->with('success', 'Referencia actualizada exitosamente');
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

    /**
     * Get the reference dashboard data.
     */
    public function dashboard(Request $request)
    {
        try {
            $user = Auth::user();
            $all = $user->can('ver todas las referencias');
            $own = $user->can('ver referencias propias');
            $staff = $user->can('ver referencias del personal');

            if (!$all && !$own && !$staff) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción. Si crees que esto es un error, contacta al administrador del sistema.');
            }

            $query = Reference::query()->with(['country', 'stake.user']);

            if (!$all && $own) {
                $stakesIds = Stake::where('user_id', $user->id)->pluck('id');
                $query->whereIn('stake_id', $stakesIds);
            }

            $references = $query->get();
            $total = $references->count();

            // General statistics
            $pending = $references->where('status.id', RequestStatusEnum::PENDING->value)->count();
            $accepted = $references->where('status.id', RequestStatusEnum::APPROVED->value)->count();
            $rejected = $references->where('status.id', RequestStatusEnum::REJECTED->value)->count();
            $acceptancePercentage = $total > 0 ? round(($accepted / $total) * 100, 1) : 0;

            // References this week
            $newThisWeek = $references->where('created_at', '>=', now()->startOfWeek())->count();

            $stats = [
                'total' => $total,
                'pending' => $pending,
                'accepted' => $accepted,
                'rejected' => $rejected,
                'acceptancePercentage' => $acceptancePercentage,
                'newThisWeek' => $newThisWeek,
            ];

            // References by country
            $referencesByCountry = $references->groupBy('country.name')
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

            // Referencias por reclutador (pendientes) con filtro de país opcional
            $recruiterQuery = $references->where('status.id', RequestStatusEnum::PENDING->value);

            // Aplicar filtro de país si se proporciona y el usuario tiene permisos
            if ($all && $request->has('country') && $request->get('country') !== '') {
                $countryId = (int) $request->get('country');
                $recruiterQuery = $recruiterQuery->where('country.id', $countryId);
            }

            $referencesByRecruiter = $recruiterQuery->groupBy('stake.user.firstname', 'stake.user.lastname', 'stake.user.id')
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

            // Obtener países solo si el usuario tiene permisos para ver todo
            $countries = $all ? Country::where('status', StatusEnum::ACTIVE->value)->get(['id', 'name']) : [];

            return Inertia::render('pre-registration/references-dashboard', [
                'data' => [
                    'stats' => $stats,
                    'referencesByCountry' => $referencesByCountry,
                    'referencesByRecruiter' => $referencesByRecruiter,
                    'countries' => $countries
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el dashboard de referencias',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the attributes for the reference notification.
     */
    private function buildReferenceNotification($user, $reference): array
    {
        return [
            'greeting' => 'Estimado ' . $user->full_name,
            'subject' => 'Nueva Referencia: ' . $reference->name,
            'mensaje' => <<<'EOT'
Te informamos que tienes un nuevo referido pendiente de revisión.
Por favor, acceda al sistema para consultar los detalles y tomar la acción correspondiente.
EOT,
            'salutation' =>  'Atentamente: Sistema Integral de Gestión Educativa FUNVAL',
            'action' => [
                'text' => '👉 Ver Referencias',
                'url' => route('references.index'),
            ],
        ];
    }
}
