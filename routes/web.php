<?php

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
        Route::get('access-control/users', [UserController::class, 'index'])->name('users.index');
        Route::get('access-control/users/create', [UserController::class, 'create'])->name('users.create');
        Route::get('access-control/users/{id}', [UserController::class, 'edit'])->name('users.edit');

        // access control routes (roles)
        Route::get('access-control', [RoleController::class, 'index'])->name('access.index');
        Route::post('access-control/roles/create', [RoleController::class, 'store'])->name('access.store');
        Route::put('access-control/roles/{roleId}', [RoleController::class, 'updateRolePermissions'])->name('roles.permissions.update');



        Route::get('settings/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
