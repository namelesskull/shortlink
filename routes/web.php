<?php

use App\Http\Controllers\FallbackRouteController;
use App\Http\Controllers\LinkImageController;
use Common\Core\Controllers\HomeController;
use Common\Pages\CustomPageController;

Route::get('contact', [HomeController::class, 'render']);
Route::get('pages/{slugOrId}', [CustomPageController::class, 'show']);
Route::get('login', [HomeController::class, 'render'])->name('login');
Route::get('register', [HomeController::class, 'render'])->name('register');
Route::get('forgot-password', [HomeController::class, 'render']);
Route::get('pricing', '\Common\Billing\PricingPageController');

Route::get('{linkHash}/img', [LinkImageController::class, 'show']);

// CATCH ALL ROUTES AND REDIRECT TO HOME
Route::fallback(FallbackRouteController::class);
