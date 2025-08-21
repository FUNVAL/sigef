<?php

namespace App\Http\Controllers;

use App\Enums\CourseModalityEnum;
use App\Enums\StatusEnum;
use App\Models\course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return Inertia::render('courses/index', [
                'courses' => course::where('status', '!=', StatusEnum::DELETED->value)
                    ->orderBy('status', 'asc')
                    ->get(),
            ]);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to load users: ' . $e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $course = course::where('name', $request->name)->first();

        // dd($course->status);
        if( $course && $course->status['id'] === StatusEnum::DELETED->value) {
            // If the course exists but is deleted, restore it
            $course->status = $request->status ?? StatusEnum::ACTIVE->value;
            $course->duration = $request->duration ?? $course->duration;
            $course->modality = $request->modality ?? $course->modality;

            $course->save();

            return redirect()->route('courses.index')
                ->with('success', 'Curso restaurado exitosamente');
        }

        try {
            $validated =  $request->validate([
                'name' => 'required|string|max:255|unique:courses,name',
                'duration' => 'nullable|integer|min:1',
                'modality' => 'required|in:' . implode(',', CourseModalityEnum::Values()),
                'status' => 'required|in:' . implode(',', StatusEnum::Values()),
            ]);

            $course = course::create([
                'name' => $validated['name'],
                'status' => $validated['status'],
                'duration' => $validated['duration'],
                'modality' => $validated['modality'],
            ]);

            return redirect()->route('courses.index')
                ->with('success', 'Curso restaurado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $course = course::findOrFail($id);
            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve course: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $course = course::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:courses,name,' . $id,
                'duration' => 'nullable|integer|min:1',
                'modality' => 'required|in:' . implode(',', CourseModalityEnum::Values()),
                'status' => 'required|in:' . implode(',', StatusEnum::Values()),
            ]);

            $course->update($validated);
            $course->save();
            return redirect()->route('courses.index')
                ->with('success', 'Curso actualizado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $course = course::findOrFail($id);

            $course->status = StatusEnum::DELETED->value;
            $course->save();

            return redirect()->route('courses.index')
                ->with('success', 'Curso eliminado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete course: ' . $e->getMessage()]);
        }
    }
}
