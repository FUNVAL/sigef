<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PreInscriptionController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StakeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware('auth')->group(function () {
        // access control routes (users) 
        Route::prefix('access-control/users')->name('users.')
            ->controller(UserController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::get('{id}', 'edit')->name('edit');
                Route::post('create', 'store')->name('store');
                Route::put('{id}', 'update')->name('update');
            });

        // access control routes (roles)
        Route::prefix('access-control')->name('access.')
            ->controller(RoleController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/roles/create', 'store')->name('store');
                Route::put('/roles/{roleId}', 'updateRolePermissions')->name('permissions.update');
            });

        // countries routes 
        Route::prefix('countries')->name('countries.')
            ->controller(CountryController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::post('create', 'store')->name('store');
                Route::get('{id}', 'edit')->name('edit');
                Route::put('{id}', 'update')->name('update');
            });

        // stakes routes
        Route::prefix('stakes')->name('stakes.')
            ->controller(StakeController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::post('create', 'store')->name('store');
                Route::get('{id}', 'edit')->name('edit');
                Route::put('{id}', 'update')->name('update');
            });

        Route::prefix('courses')->name('courses.')
            ->controller(CourseController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('create', 'store')->name('store');
                Route::put('{id}', 'update')->name('update');
                Route::delete('{id}', 'destroy')->name('destroy');
            });

        Route::prefix('references')->name('references.')
            ->controller(ReferenceController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::post('create', 'store')->name('store');
                Route::get('{id}', 'show')->name('show');
                Route::put('{id}', 'update')->name('update');
                Route::delete('{id}', 'destroy')->name('destroy');
            });

        Route::prefix('pre-inscription')->name('pre-inscription.')
            ->controller(PreInscriptionController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('create', 'create')->name('create');
                Route::post('create', 'store')->name('store');
                Route::get('{id}', 'show')->name('show');
                Route::put('{id}', 'update')->name('update');
                Route::delete('{id}', 'destroy')->name('destroy');
            });

        Route::get('settings/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');


        Route::get('pre-registration', function () {
            return Inertia::render('pre-registration/pre-registration');
        })->name('pre-registration');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
