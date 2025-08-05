<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Country;
use Inertia\Inertia;
use Spatie\Permission\Models\Role as ModelsRole;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {
            return Inertia::render('access-control/users/index', [
                'users' => User::where('status', '!=', 'inactivo')->get(),
            ]);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to load users: ' . $e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return  Inertia::render('access-control/users/create', [
            'users' => User::all(),
            'roles' => ModelsRole::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'second_lastname' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'gender' => 'required', // Solo requerido, sin validar tipo
            'document_type' => 'required', // Solo requerido, sin validar tipo
            'document_number' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'marital_status' => 'required', // Solo requerido, sin validar tipo
            'address' => 'required|string|max:255',
            'contact_phone_1' => 'required|string|max:255',
            'contact_phone_2' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id', // Validar que el rol exista
        ]);

        try {
            // Encriptar la contraseña antes de crear el usuario
            $validated['password'] = bcrypt('123456');
            // Crear el usuario con los datos validados
            $user = User::create($validated);

            // Asignar roles si se proporcionaron
            if (isset($validated['role_id'])) {
                $user->syncRoles($validated['role_id']);
            }

            return redirect()->route('users.index')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $user = User::findOrFail($id);
            return Inertia::render('access-control/users/edit', [
                'user' => $user,
                'roles' => ModelsRole::all(),
            ]);
        } catch (\Throwable $th) {
            // Optionally handle the exception, e.g., redirect or show error
            return redirect()->route('users.index')->withErrors('User not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'second_lastname' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'gender' => 'required', // Solo requerido, sin validar tipo
            'document_type' => 'required', // Solo requerido, sin validar tipo
            'document_number' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'marital_status' => 'required', // Solo requerido, sin validar tipo
            'address' => 'required|string|max:255',
            'contact_phone_1' => 'required|string|max:255',
            'contact_phone_2' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id', // Validar que el rol exista
            'status' => 'required',
        ]);

        try {
            $user = User::findOrFail($id);
            // Actualizar el usuario con los datos validados
            $user->update($validated);

            if (isset($validated['role_id'])) {
                $user->syncRoles($validated['role_id']);
            }

            return redirect()->route('users.index')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Show the form for assigning stakes to a user.
     */
    public function assignStakes(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $countries = Country::all();

            // Debugging - vamos a agregar un log temporal
            \Log::info('Assign stakes accessed for user: ' . $id);

            return Inertia::render('access-control/users/asign-stakes', [
                'countries' => $countries,
                'userId' => (int) $id,
                'userName' => $user->fullname,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in assignStakes: ' . $e->getMessage());
            return redirect()->back()
                ->withErrors(['error' => 'Failed to load assign stakes page: ' . $e->getMessage()]);
        }
    }
}
