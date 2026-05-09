<?php

use App\Http\Controllers\Authentication\LogoutUserController;
use App\Http\Controllers\Authentication\SocialiteController;

Route::controller(SocialiteController::class)->prefix('auth')->group(function () {
    Route::get('/{provider}/redirect', 'redirectToProvider');

    Route::get('/{provider}/callback', 'handleProviderCallback');
});

Route::post('/auth/logout', LogoutUserController::class);
