<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscription = Subscription::with('user_id', 'package_id')->latest()->get();
    }
    public function current()
    {
        $user = Auth::user();

        $subscriptions = Subscription::with('package')->where('user_id', $user->id)->whereIn('status', ['active', 'frozen'])->latest()->get();
        return;
    }


    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
            'start_date' => 'required|date|after_or_equal:today'
        ]);

        $user = Auth::user();

        $hassubscription = Subscription::where('user_id', $user->id)->where('status', 'active')->exists();

        if ($hassubscription) {
            return redirect()->back()->with('message', 'you have an active subscription');

            $package = Package::findOrFail($request->package->id);

            $startdate = Carbon::parse($request->start_id);
            $enddate = $startdate->copy()->addDays($package->duration_days);

            Subscription::create([
                'user_id' => $user->id,
                'package_id' => $package->id,
                'start_date' => $startDate->format('Y-m-d'),
                'end_date' => $endDate->format('Y-m-d'),
                'remaining_meals' => $package->meals_count,
                'status' => 'active',
            ]);
            return;
        }
    }

    public function updateStatus(Request $request, Subscription $subscription)
    {
        $request->validate([
            'status' => 'required|in:active,frozen,expired,cancelled',
        ]);

        $subscription->update([
            'status' => $request->status
        ]);

        return;
    }
}
