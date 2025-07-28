<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\StatusEnum;
use Illuminate\Support\Facades\Log;

class CountryController extends Controller
{
    /** 
     * Display a listing of the resource.
     */
    public function index()
    {
       /*  try */ /* { */
            return Inertia::render('countries/index', [
                /* 'countries' => Country::where('status', '!=', StatusEnum::DELETED->value) */
                  /*   ->orderBy('status', 'asc')
                    ->get(), */
                'countries' => Country::all(),
            ]);
       /*  } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Failed to load users: ' . $e->getMessage()]);
        } */
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
                ->with('success', 'Country created successfully.');

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
