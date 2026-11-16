<?php

use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\DeliveryAuthController;
use App\Http\Controllers\Auth\KitchenAuthController;
use App\Http\Controllers\Auth\ReceptionAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Auth\GuestAuthController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});



//--------------------------------------------------------//
// ===== Admin =====
    Route::middleware('guest:admin')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'store']);
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminAuthController::class, 'destroy'])->name('admin.logout');
});



// ===== Delivery =====
Route::middleware('guest:delivery')->group(function () {
    Route::get('/delivery/login', [DeliveryAuthController::class, 'create'])->name('delivery.login');
    Route::post('/delivery/login', [DeliveryAuthController::class, 'store']);
});

Route::middleware('auth:delivery')->group(function () {
    Route::get('/delivery/dashboard', [DeliveryAuthController::class, 'dashboard'])->name('delivery.dashboard');
    Route::post('/delivery/logout', [DeliveryAuthController::class, 'destroy'])->name('delivery.logout');
});

// ===== Kitchen =====
Route::middleware('guest:kitchen')->group(function () {
    Route::get('/kitchen/login', [KitchenAuthController::class, 'create'])->name('kitchen.login');
    Route::post('/kitchen/login', [KitchenAuthController::class, 'store']);
});

Route::middleware('auth:kitchen')->group(function () {
    Route::get('/kitchen/dashboard', [KitchenAuthController::class, 'dashboard'])->name('kitchen.dashboard');
    Route::post('/kitchen/logout', [KitchenAuthController::class, 'destroy'])->name('kitchen.logout');
});

// ===== Reception =====
Route::middleware('guest:reception')->group(function () {
    Route::get('/reception/login', [ReceptionAuthController::class, 'create'])->name('reception.login');
    Route::post('/reception/login', [ReceptionAuthController::class, 'store']);
});

Route::middleware('auth:reception')->group(function () {
    Route::get('/reception/dashboard', [ReceptionAuthController::class, 'dashboard'])->name('reception.dashboard');
    Route::post('/reception/logout', [ReceptionAuthController::class, 'destroy'])->name('reception.logout');
});

// ===== Guest =====
Route::middleware('guest:guest')->group(function () {
    Route::get('/guest/login', [GuestAuthController::class, 'create'])->name('guest.login');
    Route::post('/guest/login', [GuestAuthController::class, 'store']);
});

Route::middleware('auth:guest')->group(function () {
    Route::get('/guest/dashboard', [GuestAuthController::class, 'dashboard'])->name('guest.dashboard');
    Route::post('/guest/logout', [GuestAuthController::class, 'destroy'])->name('guest.logout');
});
