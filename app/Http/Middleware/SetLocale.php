<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle($request, Closure $next)
    {
        $locale = $request->session()->get('locale') ??
            $request->cookie('locale') ??
            config('app.locale');

        if (in_array($locale, ['en', 'es', 'pt', 'ht'])) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
