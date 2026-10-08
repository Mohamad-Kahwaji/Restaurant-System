<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\MealSelection;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealSelectionController extends Controller
{
    public function availableMeal(Request $request)
    { //Meals for clint is available for him
        $targetDate = $request->has('date') ? $request->date : Carbon::tomorrow()->format('Y-m-d');


        $meal = Meal::where('available_date', $targetDate)->get();

        return;
    }

    public function store(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|exists:meals,id',
            'selection_date' => 'required|date|after_or_equal:tomrrow',
            'delivery_type' => 'required|in:pickup,delivery',
            'notes' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        $selectionDate = Carbon::parse($request->selection_date);

        if ($selectionDate->isTomorrow() && Carbon::now()->hour >= 20) {
            return redirect()->back()->with("Sorry, the cutoff time for tomorrow's orders has passed. Please select a different date");
        }


        $subscription = Subscription::where('user_id', $user->id)->where('status', 'active')->first();

        if (!$subscription) {
            return redirect()->back()->with('error', 'not have any subscription');
        }

        if ($subscription->remaining_meal <= 0) {
            return redirect()->back()->with('error', 'I apologize you have fully exhausted your meal balance');
        }

        $meal = Meal::findOrFail($request->meal_id);
        if ($meal->available_date != $request->selection_date) {
            return redirect()->back()->with('error', 'the selection meal is not available today');
        }

        MealSelection::create([
            'subscription_id' => $subscription->id,
            'meal_id' => $meal->id,
            'selection_date' => $request->selection_date,
            'delivery_type' => $request->delivery_type,
            'notes' => $request->notes,
            'status' => 'pending'
        ]);

        $subscription->decrement('remaining_meals', 1);

        if ($subscription->remaining_meal === 0) {
            $subscription->update(['status', 'expired']);
        }

        return redirect()->route('')->with('message', 'seccessfully');
    }
}
