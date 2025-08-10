<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use App\Http\Middleware\ValidatePublicForm;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            SetLocale::class,
        ]);

        // Registrar como middleware con alias
        $middleware->alias([
            'validate.public.form' => ValidatePublicForm::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        # capturar 403 exceptions
        $exceptions->render(function (Throwable $exception, Request $request) {
            if ($exception->getPrevious() instanceof AuthorizationException) {
                return back()->with('forbidden', 'No tienes permiso para realizar esta acción. Si crees que esto es un error, contacta al administrador del sistema.');
            }
        });
    })->create();
