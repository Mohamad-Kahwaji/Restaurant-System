<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function create()
    {
        return Inertia::render('AuthAdminLogin');
    }
    public function store(Request $request){
        $admin = $request->validate([
            'email'=>['required','email'],
            'password'=>['required']
        ]);

        if(auth()->guard('admin')->attempt($admin,$request->boolean('remember'))){
            $request->session()->regenerate();

            return redirect()->route('admin.dashboard');
        }
        return back()->withErrors(['email'=>'your data is not correct']);
    }

    public function dashboard(){
        return Inertia::render('Admins/Dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
