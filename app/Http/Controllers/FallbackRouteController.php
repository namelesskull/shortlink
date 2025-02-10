<?php

namespace App\Http\Controllers;

use App\Actions\Link\LinkeablePublicPolicy;
use App\Actions\Linkeable\FindLinkeable;
use Common\Core\AppUrl;
use Common\Core\BaseController;
use Illuminate\Support\Str;

class FallbackRouteController extends BaseController
{
    const CLIENT_ROUTES = [
        'dashboard',
        'link-groups',
        'admin',
        'billing',
        'workspace',
        'contact',
        'update',
        'pages',
        'login',
        'register',
        'forgot-password',
        'password',
    ];

    const LINKEABLE_ROUTES = ['qr', 'img', '+'];

    public function __invoke(string $path = '')
    {
        $parts = $this->parsePath($path);

        if ($parts) {
            $linkeable = (new FindLinkeable())->execute($parts['hash']);

            if ($linkeable) {
                if (
                    !app(LinkeablePublicPolicy::class)->isAccessible($linkeable)
                ) {
                    abort(403);
                }
                if ($parts['route'] == 'qr') {
                    return app(LinkeableController::class)->qrCode($linkeable);
                } elseif ($parts['route'] === '+') {
                    return app(LinkeableController::class)->dashboard(
                        $linkeable,
                    );
                } else {
                    return app(LinkeableController::class)->show($linkeable);
                }
            }
        }

        if (!$path || $path === '/') {
            return app(LandingPageController::class)->show();
        }

        return $this->renderClientSideApp();
    }

    private function parsePath(string $path = ''): array|null
    {
        $host = request()->getHost();
        if (
            settings('links.subdomain_matching') &&
            !app(AppUrl::class)->envAndCurrentHostsAreEqual &&
            substr_count($host, '.') >= 2 &&
            (!$path || in_array($path, self::LINKEABLE_ROUTES))
        ) {
            return [
                'hash' => explode('.', $host)[0],
                'route' => $path,
            ];
        }

        if ($path) {
            $parts = explode('/', $path);
            // site.com/kd02lk+
            if (Str::endsWith($path, '+')) {
                $parts[0] = rtrim($parts[0], '+');
                $parts[1] = '+';
            }
            if (!$this->isClientRoute($parts)) {
                return [
                    'hash' => $parts[0],
                    'route' => $parts[1] ?? null,
                ];
            }
        }

        return null;
    }

    private function isClientRoute(array $parts): bool
    {
        if (
            count($parts) === 2 &&
            in_array($parts[1], self::LINKEABLE_ROUTES)
        ) {
            return false;
        }

        return count($parts) != 1 || in_array($parts[0], self::CLIENT_ROUTES);
    }
}
