<?php

use App\Http\Controllers\PreInscriptionController;
use App\Http\Controllers\ReferenceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/inscription-reference', [PreInscriptionController::class, 'create'])
    ->name('inscription-reference');

Route::post('/pre-inscription', [PreInscriptionController::class, 'store'])
    ->name('pre-inscription.store');

Route::post('/references', [ReferenceController::class, 'store'])
    ->name('references.store');
