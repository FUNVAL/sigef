<?php

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
        Route::redirect('access-control', 'access-control/users');

        Route::get('access-control/users', [UserController::class, 'index'] )->name('users.all');
        Route::get('access-control/users/create', [UserController::class, 'create'])->name('users.create');
        Route::get('access-control/users/{id}', [UserController::class, 'view'])->name('users.edit');

        Route::get('settings/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
    
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
