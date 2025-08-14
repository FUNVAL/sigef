<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PreInscriptionController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StakeController;
use App\Http\Controllers\UserController;
use App\Models\Stake;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function(){
        return Inertia::render('dashboard');
    })
        ->name('dashboard');

    Route::prefix('access-control/users')->name('users.')
        ->controller(UserController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::get('{id}/assign-stakes', 'assignStakes')->name('assign-stakes')->middleware('can:ver estacas asignadas');
            Route::get('{id}', 'edit')->name('edit');
            Route::post('create', 'store')->name('store');
            Route::put('{id}', 'update')->name('update');
        });

    // Ruta para obtener stakes por país (para panel administrativo)
    Route::get('api/admin/stakes/{country_id}', [StakeController::class, 'filterByCountryId'])
        ->name('api.admin.stakes.by-country');

    // Ruta para obtener stakes asignadas a un usuario específico
    Route::get('api/admin/user-stakes/{user_id}', [StakeController::class, 'getUserStakes'])
        ->name('api.admin.user-stakes');

    Route::prefix('access-control')->name('access.')
        ->controller(RoleController::class)->group(function () {
            Route::get('/', 'index')->name('index')->middleware('can:ver roles');
            Route::post('/roles/create', 'store')->name('store')->middleware('can:crear roles');
            Route::put('/roles/{roleId}', 'updateRolePermissions')->name('permissions.update')->middleware('can:asignar permisos a roles');
        });

    Route::prefix('countries')->name('countries.')
        ->controller(CountryController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('create', 'store')->name('store');
            Route::get('{id}', 'edit')->name('edit');
            Route::put('{country}', 'update')->name('update');
            Route::delete('{country}', 'destroy')->name('destroy');
        });

    Route::prefix('stakes')->name('stakes.')
        ->controller(StakeController::class)->group(function () {
            // Listado y creación
            Route::get('/', 'index')->name('index')->middleware('can:ver estacas');
            Route::post('/', 'store')->name('store')->middleware('can:crear estacas');

            // Edición
            Route::put('/{stake}', 'update')->name('update')->middleware('can:editar estacas');

            // Eliminación (soft delete)
            Route::delete('/{stake}', 'destroy')->name('destroy')->middleware('can:eliminar estacas');

            Route::patch('/{id}/assign-user', 'assignUser')->name('assign-user')->middleware('can:asignar usuarios a estacas');
        });

    Route::prefix('courses')->name('courses.')
        ->controller(CourseController::class)->group(function () {
            Route::get('/', 'index')->name('index')->middleware('can:ver cursos');
            Route::post('create', 'store')->name('store')->middleware('can:crear cursos');
            Route::put('{id}', 'update')->name('update')->middleware('can:editar cursos');
            Route::delete('{id}', 'destroy')->name('destroy')->middleware('can:eliminar cursos');
        });

    Route::prefix('references')->name('references.')
        ->controller(ReferenceController::class)->group(function () {
            Route::get('/dashboard', 'dashboard')->name('dashboard');
            Route::get('/', 'index')->name('index');
            Route::get('{id}', 'show')->name('show');
            Route::get('{id}/edit', 'edit')->name('edit');
            Route::patch('{id}', 'update')->name('update');
            Route::put('{id}', 'updateReference')->name('update-reference');
            Route::delete('{id}', 'destroy')->name('destroy');
        });

    Route::prefix('pre-inscription')->name('pre-inscription.')
        ->controller(PreInscriptionController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/dashboard', 'dashboard')->name('dashboard');
            Route::get('{id}', 'show')->name('show');
            Route::get('{id}/edit', 'edit')->name('edit');
            Route::put('{id}', 'update')->name('update');
            Route::put('{id}/update-data', 'updatePreInscription')->name('update-data');
            Route::delete('{id}', 'destroy')->name('destroy');
        });

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/public.php';
