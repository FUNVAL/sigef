<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $countries = Country::all();
            return response()->json($countries);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve countries'], 500);
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
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:countries',
                'code' => 'required|string|size:3|unique:countries',
                'flag' => 'nullable|string'
            ]);

            $country = Country::create($validated);
            return response()->json($country, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create country', 'message' => $e->getMessage()], 500);
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
     * Show the form for editing the specified resource.
     */
    public function edit(Country $country)
    {
        try {
            return response()->json($country);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve country for editing'], 500);
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
                'code' => 'sometimes|required|string|size:3|unique:countries,code,' . $country->id,
                'flag' => 'nullable|string'
            ]);

            $country->update($validated);
            return response()->json($country);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update country', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        try {
            $country->delete();
            return response()->json(['message' => 'Country deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete country', 'message' => $e->getMessage()], 500);
        }
    }
}
