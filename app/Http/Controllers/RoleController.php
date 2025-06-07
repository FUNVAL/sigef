<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get roles estructura [ ['id' => 1, 'name' => 'admin', 'permissions' => [ 1,2,5,8 ] ] ]
        $roleWithPermissions = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('id')->toArray(),
            ];
        });
        $permissionsByCategory = Permission::all()->groupBy('category');
        // obtener categoris de permisos sin repetir 

        $permissions = [];
        $counter = 1;
        foreach ($permissionsByCategory as $category => $permissionsGroup) {
            $permissions[$category] = [
                'id' => $counter++,
                'name' => $category,
                'permissions' => $permissionsGroup,
            ];
        }

        return  Inertia::render('access-control/index', [
            'roles' => $roleWithPermissions,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // La validación directa sin try-catch para errores de validación
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'required|string|max:255',
        ]);

        try {
            // Crear el rol
            $role = Role::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
            ]);

            return redirect()->route('access.index')
                ->with('success', 'Rol "' . $role->name . '" creado exitosamente.');
        } catch (\Exception $e) {
            // Solo para errores no relacionados con la validación
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    // agregar permisos a un rol
    public function updateRolePermissions(Request $request, $roleId)
    {
        $role = Role::findOrFail($roleId);

        // Validar los permisos
        $validated = $request->validate([
            'permissions' => 'present|array', // Cambio 'required' a 'present' para permitir arrays vacíos
        ]);

        try {
            if (empty($validated['permissions'])) {
                // Si el array está vacío, revocar todos los permisos
                $role->permissions()->detach();
                $message = 'Todos los permisos han sido revocados del rol "' . $role->name . '".';
            } else {
                // Validar que los IDs de permisos existan
                $request->validate([
                    'permissions.*' => 'exists:permissions,id',
                ]);

                // Asignar permisos al rol
                $role->syncPermissions($validated['permissions']);
                $message = 'Permisos actualizados exitosamente al rol "' . $role->name . '".';
            }

            return redirect()->route('access.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }
}
