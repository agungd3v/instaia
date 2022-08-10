<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RestrictMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $origin = $request->headers->get('Origin');
        if ($origin !== env('ALLOW_ORIGIN')) {
            return response()->json([
                "status" => false,
                "method" => "not_allowed",
                "message" => $origin . ', Not Allowed' 
            ], 401);
        }
        return $next($request);
    }
}
