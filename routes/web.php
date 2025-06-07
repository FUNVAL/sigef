<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\RoleController;
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
        Route::prefix('access-control/users')->name('users.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('create', [UserController::class, 'create'])->name('create');
            Route::get('{id}', [UserController::class, 'edit'])->name('edit');
            Route::post('create', [UserController::class, 'store'])->name('store');
            Route::put('{id}', [UserController::class, 'update'])->name('update');
        });

        // access control routes (roles)
        Route::prefix('access-control')->name('roles.')->group(function () {
            Route::get('/', [RoleController::class, 'index'])->name('index');
            Route::post('/roles/create', [RoleController::class, 'store'])->name('store');
            Route::put('{/roles/roleId}', [RoleController::class, 'updateRolePermissions'])->name('permissions.update');
        });


        // countries routes 
        Route::prefix('countries')->name('countries.')->group(function () {
            Route::get('/', [CountryController::class, 'index'])->name('countries.index');
            Route::get('create', [CountryController::class, 'create'])->name('countries.create');
            Route::post('create', [CountryController::class, 'store'])->name('countries.store');
            Route::get('{id}', [CountryController::class, 'edit'])->name('countries.edit');
            Route::put('{id}', [CountryController::class, 'update'])->name('countries.update');
        });

        Route::get('settings/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
