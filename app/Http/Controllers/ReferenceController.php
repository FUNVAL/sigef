<?php

namespace App\Http\Controllers;

use App\Enums\RequestStatusEnum;
use App\Models\Country;
use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use App\Models\Stake;
use App\Models\User;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $user = Auth::user();
            $isAdmin = $user->hasRole('Administrador');
            $query = Reference::query()->with(['country', 'stake', 'modifier'])->orderBy('created_at', 'desc');

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
                User::role('Responsable')
                ->get()
                ->map(fn($u) => [
                    'id' => $u->id,
                    'name' => $u->full_name,
                ])
                ->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)
                ->values()
                ->toArray();

            return Inertia::render('pre-registration/references', [
                'references' => $query->get(),
                'responsables' => $responsables,
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
            'countries' => Country::all()
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

            $message =  [
                'type' => 'success',
                'message' =>  __('common.messages.success.reference_success'),
            ];

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
                'countries' => Country::all()
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
            $validated = $request->validate(
                [
                    'status' => 'required|in:' . implode(',', RequestStatusEnum::values()),
                    'declined_reason' => [
                        'nullable',
                        'numeric',
                        function ($attribute, $value, $fail) use ($request) {
                            if (((int)$request->input('status') === 3 || (int)$request->input('status') === 1) && empty($value)) {
                                $fail('Este campo es obligatorio.');
                            }
                        },
                    ],
                    'declined_description' => [
                        'nullable',
                        'string',
                        function ($attribute, $value, $fail) use ($request) {
                            if ((int)$request->input('status') === 3 && empty($value)) {
                                $fail('Este campo es obligatorio.');
                            }
                        },
                    ],
                ]
            );

            if ($validated['status'] === RequestStatusEnum::APPROVED->value) {
                $validated['declined_reason'] = null;
            }

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
    public function dashboard()
    {
        try {
            $user = Auth::user();
            $query = Reference::query()->with(['country', 'stake', 'modifier']);

            if ($user->hasRole('Responsable') && !$user->hasRole('Administrador')) {
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

            // References by stake
            $referencesByStake = $references->groupBy('stake.name')
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

            return Inertia::render('pre-registration/references-dashboard', [
                'data' => [
                    'stats' => $stats,
                    'referencesByCountry' => $referencesByCountry,
                    'referencesByStake' => $referencesByStake,
                    'references' => $references
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
}
