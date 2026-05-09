<?php

namespace App\Http\Controllers\Authentication;

use App\Enums\OAuth2Provider;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

class SocialiteController extends Controller
{
    /**
     * @param  SocialiteUser  $providerUser
     * @return User
     */
    private function updateOrCreateUser(SocialiteUser $providerUser, OAuth2Provider $provider): User
    {
        $data = [];

        if ($provider->value === OAuth2Provider::GOOGLE->value) {
            $data['google_id'] = $providerUser->getId();
        } elseif ($provider->value === OAuth2Provider::FACEBOOK->value) {
            $data['facebook_id'] = $providerUser->getId();
        } else {
            $data['apple_id'] = $providerUser->getId();
        }

        $data = array_merge($data, [
            'name' => $providerUser->getName(),
            'email' => $providerUser->getEmail(),
            'password' => null,
        ]);

        $user = User::updateOrCreate(['email' => $providerUser->getEmail()], $data);

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return $user;
    }

    /**
     * @param  OAuth2Provider  $provider
     * @return RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToProvider(OAuth2Provider $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * @param  OAuth2Provider  $provider
     * @return RedirectResponse
     */
    public function handleProviderCallback(OAuth2Provider $provider)
    {
        $providerUser = Socialite::driver($provider->value)->user();
        $user = $this->updateOrCreateUser($providerUser, $provider);
        Auth::login($user);

        return to_route('app.dashboard');
    }
}
