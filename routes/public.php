<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PreInscriptionController;
use App\Http\Controllers\ReferenceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('preinscription-form', [PreInscriptionController::class, 'create'])
    ->name('preinscription-form');

Route::post('/pre-inscription', [PreInscriptionController::class, 'store'])
    ->name('pre-inscription.store');

Route::post('/references', [ReferenceController::class, 'store'])
    ->name('references.store');

Route::get('/reference-form', [ReferenceController::class, 'create'])
    ->name('/reference-form');

# formulario publico que maneja la preinscripcion y referencias
Route::get('preinscription-reference', fn() => Inertia::render('forms/pre-registration'))
    ->name('preinscription-reference');

Route::get('language/{locale}', [LanguageController::class, 'switchLang'])->name('language.switch');
