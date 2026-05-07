<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\App;

class SaveUserPreferredLocale
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * @param  Logout  $event
     * @return void
     */
    public function handle(Logout $event): void
    {
        User::update(['preferred_locale' => App::currentLocale()]);
    }
}
