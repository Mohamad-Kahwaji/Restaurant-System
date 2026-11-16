<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }


    protected function redirect_To(Request $request): ?string{
        $guard = $this->guards[0]?? null;

        return  match ($guard) {
            'admin' => route('admin.dashboard'),
            'delivery' => route('delivery.dashboard'),
            'kitchen' => route('kitchen.dashboard'),
            'reception' => route('reception.dashboard'),
            'guest' => route('guest.dashboard'),
            default => route('dashboard'),
        };
    }
}
