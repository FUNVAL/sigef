<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PreInscriptionController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\RecruitmentController;
use App\Http\Controllers\StakeController;
use App\Http\Controllers\StudentRegistrationController;
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

# formulario publico de inscripcion de estudiantes
Route::get('student-registration', [StudentRegistrationController::class, 'create'])
    ->name('student-registration');

Route::post('/student-registration', [StudentRegistrationController::class, 'store'])
    ->name('student-registration.store');

    # formulario publico de reclutamiento
Route::get('recruitment-form', [RecruitmentController::class, 'create'])
    ->name('recruitment-form');

Route::post('/recruitment', [RecruitmentController::class, 'store'])
    ->name('recruitment.store');

# ruta de test para verificar enums
Route::get('recruitment-test-enums', function () {
    $enums = [
        'familyRelationship' => \App\Enums\FamilyRelationshipEnum::toArray(),
        'deviceType' => \App\Enums\DeviceTypeEnum::toArray(),
        'housingType' => \App\Enums\HousingTypeEnum::toArray(),
        'employmentType' => \App\Enums\EmploymentTypeEnum::toArray(),
        'jobPosition' => \App\Enums\JobPositionEnum::toArray(),
        'bonusCategory' => \App\Enums\BonusCategoryEnum::toArray(),
    ];
    return response()->json($enums);
})->name('recruitment-test-enums');

Route::get('language/{locale}', [LanguageController::class, 'switchLang'])->name('language.switch');

Route::get('api/stakes/{country_id}', [StakeController::class, 'filterByCountryId'])
    ->middleware(['validate.public.form', 'throttle:60,1'])
    ->name('api.stakes.by-country');
