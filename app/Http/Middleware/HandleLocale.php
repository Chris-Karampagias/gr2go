<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    /**
     * @param  Request  $request
     * @param  Closure  $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $acceptLanguage = $request->header('Accept-Language');
        $locale = $acceptLanguage ? substr($acceptLanguage, 0, 2) : $request->user()->preferred_locale;
        if (! $request->session()->has('locale')) {
            $request->session()->put('locale', $locale);
        }
        App::setLocale($locale);

        return $next($request);
    }
}
