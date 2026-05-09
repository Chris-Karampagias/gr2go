<?php

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'app/dashboard')->name('app.dashboard');
});
