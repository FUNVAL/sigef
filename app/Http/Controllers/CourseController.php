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
    public function index(Request $request)
    {
        try {
            $query = course::where('status', '!=', StatusEnum::DELETED->value);

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            $courses = $query->orderBy('status', 'asc')
                ->paginate($perPage, ['*'], 'page', $page);

            return Inertia::render('courses/index', [
                'courses' => $courses,
                'pagination' => [
                    'current_page' => $courses->currentPage(),
                    'per_page' => $courses->perPage(),
                    'total' => $courses->total(),
                    'last_page' => $courses->lastPage(),
                ],
                'filters' => $request->only(['search']),
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
                ->with('success', 'Course created successfully.');
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
                ->with('success', 'Course updated successfully.');
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
                ->with('success', 'Course deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete course: ' . $e->getMessage()]);
        }
    }
}
