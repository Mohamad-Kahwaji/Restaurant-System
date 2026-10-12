<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::$user();

        $orders = Order::with('items_meal')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return;
    }

    public function store(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'payment_method' => 'required|in:cash,online',
            'items' => 'required|array|min:1',
            'items.*.meal_id' => 'required|exists:meals,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $totalAmount = 0;
            $user = Auth::user();

            $order = Order::create([
                'user_id' => $user->id,
                'address_id' => $request->address_id,
                'total_amount' => 0,
                'payment_method' => $request->payment_method,
                'status' => 'pending'
            ]);

            foreach ($request->items as $item) {
                $meal = Meal::findOrFail($item['meal_id']);
                $itemTotal = $meal->price * $item['quantity'];
                $totalAmount += $itemTotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'meal_id' => $meal->id,
                    'quantity' => $item['quantity'],
                    'price' => $meal->price,
                ]);
            }

            $order->update([
                'total_amount' => $totalAmount,
            ]);
        });
        return redirect()->back()->with('message', 'seccessfully');
    }
}
