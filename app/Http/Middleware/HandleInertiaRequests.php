<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Used to map Fortify routes to translations.
     */
    private const array FORTIFY_TRANSLATION_MAP = [
        'login' => 'public/login',
        'register' => 'public/register',
        'password.request' => 'public/password/request',
        'password.reset' => 'public/password/reset',
        'verification.notice' => 'app/verification/notice',
        'two-factor.login' => 'public/two-factor',
    ];

    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Convention for pages that should receive translations:
     * - Name the route with a dot-separated prefix of `public.` or `auth.` (e.g. `public.index`,
     *   `public.login`). Any other route name yields an empty array unless it is a Fortify route
     *   listed in {@see self::FORTIFY_TRANSLATION_MAP}.
     * - Add a PHP file under `lang/{locale}/` whose path matches the route name with dots replaced
     *   by directory separators (e.g. route `public.index` → `lang/en/public/index.php`). The file
     *   must return an array of string keys to translated values; those keys are what the page reads
     *   from `pageTranslations` (e.g. `pageTranslations.proceed_to_application`).
     * - Fortify routes use their Laravel route names but map to explicit `public/...` lang paths via
     *   {@see self::FORTIFY_TRANSLATION_MAP}, so their copy lives alongside other public auth UI.
     *
     * @param  Request  $request
     * @return array
     */
    public function getPageTranslations(Request $request): array
    {

        $route_name = $request->route()->getName();

        if (! $route_name) {
            return [];
        }

        if (isset(self::FORTIFY_TRANSLATION_MAP[config('fortify.prefix').$route_name])) {
            return __(self::FORTIFY_TRANSLATION_MAP[config('fortify.prefix').$route_name]);
        }

        $translation_path = str_replace('.', '/', $route_name);

        if (str_starts_with($route_name, 'public') || str_starts_with($route_name, 'auth')) {
            return __($translation_path);
        } else {
            return [];
        }
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $request->route()->getName();

        return [
            ...parent::share($request),
            'name' => Inertia::once(fn () => config('app.name')),
            'locale' => Inertia::once(fn () => app()->getLocale()),
            'auth' => [
                'user' => $request->user() ? $request->user()->only(['id', 'name', 'email']) : null,
                'isAuthenticated' => (bool) $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'pageTranslations' => $this->getPageTranslations($request),
        ];
    }
}
