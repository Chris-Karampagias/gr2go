<?php

namespace App\Enums;

enum OAuth2Provider: string
{
    case GOOGLE = 'google';
    case FACEBOOK = 'facebook';
    case APPLE = 'apple';
}
