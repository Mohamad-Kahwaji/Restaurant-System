<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
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

    protected function redidreect_To(Request $request): ?string{
        if($request->expectsJson()){
            return null;
        }
        $guard = $this->guards[0] ?? null;

        return match ($guard) {
            'admin' => route('admin.login'),
            'delivery' => route('delivery.login'),
            'kitchen' => route('kitchen.login'),
            'reception' => route('reception.login'),
            'guest' => route('guest.login'),
            default => route('login'),
        };

    }
}
