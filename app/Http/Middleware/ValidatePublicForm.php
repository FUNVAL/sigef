<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidatePublicForm
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar que sea una petición AJAX
        if (!$request->ajax()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid request type'
            ], 400);
        }

        // Verificar CSRF token (Inertia lo incluye automáticamente)
        if (!$request->session()->token()) {
            return response()->json([
                'status' => 'error',
                'message' => 'CSRF token missing'
            ], 419);
        }

        // Verificar token específico para formularios públicos
        $publicToken = $request->header('X-Public-Form-Token') ?? $request->input('public_token');
        $validToken = config('app.public_form_token');

        if (!$publicToken || !hash_equals($validToken, $publicToken)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 403);
        }

        return $next($request);
    }
}
