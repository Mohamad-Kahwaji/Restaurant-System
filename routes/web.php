<?php

use App\Http\Controllers\MealController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
Route::get('/kitchen', function () {
    return Inertia::render('Kitchen');
});


Route::get('/subscription', function () {
    return Inertia::render('Subscription', [
        'subscription' => null,
        'days'         => [],
        'meals'        => [],
    ]);
})->middleware('auth');


Route::get('/practice', function () {
    return Inertia::render('experment');
});



////coustomer
   // Route::get('/customer/menu', fn () => Inertia::render('Customer/Menu'))->name('customer.menu');
    //Route::get('/customer/basket', fn () => Inertia::render('Customer/Basket'))->name('customer.basket');



    Route::get('/customer/orders', [OrderController::class, 'index'])
    ->middleware('auth')
    ->name('customer.my_orders');

////Meal
    Route::get('/customer/menu', [MealController::class, 'index'])->name('customer.menu');



////Basket
    Route::get('/customer/basket',function() {
        $user = Auth::user();
        return Inertia::render('Customer/Basket',[
            'deliveryFee'=> config('shop.delivery_Fee',0),
            'addresses'=>$user->addresses,
        ]);
    })->middleware('auth')->name('customer.basket');




////orders

    Route::post('/orders',[OrderController::class,'store'])
    ->middleware('auth')
    ->name('oders.store');


    Route::get('/customer/orders', fn () => Inertia::render('Customer/MyOrders'))->name('customer.my_orders');


    Route::post('/orders', [OrderController::class, 'store'])
    ->middleware('auth')
    ->name('orders.store');
