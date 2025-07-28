<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class LanguageController extends Controller
{
    public function switchLang(Request $request, $locale)
    {
        // Validar que sea un idioma soportado
        if (!in_array($locale, ['en', 'es', 'pt', 'ht'])) {
            return back();
        }

        // Guardar en sesión
        $request->session()->put('locale', $locale);

        // También guardar en cookie para usuarios no autenticados
        Cookie::queue('locale', $locale, 60 * 24 * 365); // 1 año

        // Redirigir de vuelta
        return back();
    }
}
