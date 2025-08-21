<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\StatusEnum;

class CountryController extends Controller
{
    /** 
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Country::where('status', '!=', StatusEnum::DELETED->value);

            // Búsqueda simple para el frontend
            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            // Paginación
            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            $countries = $query->orderBy('status', 'asc')
                ->paginate($perPage, ['*'], 'page', $page);

            return Inertia::render('countries/index', [
                'countries' => $countries,
                'pagination' => [
                    'current_page' => $countries->currentPage(),
                    'per_page' => $countries->perPage(),
                    'total' => $countries->total(),
                    'last_page' => $countries->lastPage(),
                ],
                'filters' => $request->only(['search'])
            ]);
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Failed to load countries: ' . $e->getMessage()]);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */


    public function store(Request $request)
    {

        $country = Country::where('name', $request->name)->first();
        
        if ($country && $country->status['id'] == StatusEnum::DELETED->value) {
            // Si el país existe pero está eliminado, restaurarlo
            $country->status = $request->status ?? StatusEnum::ACTIVE->value;
            $country->code = $request->code ?? $country->code;
            $country->phone_code = $request->phone_code ?? $country->phone_code;
            $country->flag = $request->flag ?? null;

            $country->save();

            return redirect()->route('countries.index')
                ->with('success', 'Pais creado exitosamente');
        }
         

        try {
            $validated =  $request->validate([
                'name' => 'required|string|max:255|unique:countries,name',
                'code' => 'nullable|string|min:2',
                'phone_code' => 'nullable|string|min:2',
                'flag' => 'nullable|string|min:1',
                'status' => 'required|in:' . implode(',', StatusEnum::Values()),
            ]);


            $country = Country::create(
                $validated
            );


            return redirect()->route('countries.index')
                ->with('success', 'Pais creado exitosamente.');

        } catch (\Exception $e) {

            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Country $country)
    {
        try {
            return response()->json($country);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve country'], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Country $country)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255|unique:countries,name,' . $country->id,
                'code' => 'sometimes|required|string|min:2|unique:countries,code,' . $country->id,
                'phone_code' => 'nullable|string|min:2',
                'flag' => 'nullable|string',
                'status' => 'required|in:' . implode(',', StatusEnum::Values()),
            ]);

            $country->update($validated);
            return redirect()->route('countries.index')
                ->with('success', 'Country updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        try {
            $country->status = StatusEnum::DELETED->value;
            $country->save();

            return redirect()->route('countries.index')
                ->with('success', 'Country deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete country: ' . $e->getMessage()]);
        }
    }
}
