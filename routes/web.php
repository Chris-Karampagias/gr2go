<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/index')->name('public.index');

require __DIR__.'/authentication.php';
require __DIR__.'/app.php';
require __DIR__.'/settings.php';
