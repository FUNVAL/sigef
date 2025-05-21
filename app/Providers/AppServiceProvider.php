<?php

namespace App\Providers;

use App\Enums\AttendanceStatusEnum;
use App\Enums\DocumentTypeEnum;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\UserStatusEnum;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('enums', function () {
            return [
                'userStatus' => UserStatusEnum::toSelectArray(),
                'requestStatus' => RequestStatusEnum::toSelectArray(),
                'attendanceStatus' => AttendanceStatusEnum::toSelectArray(),
                'documentType' => DocumentTypeEnum::toSelectArray(),
                'gender' => GenderEnum::toSelectArray(),
                'maritalStatus' => MaritalStatusEnum::toSelectArray(),
            ];
        });
    }
}
