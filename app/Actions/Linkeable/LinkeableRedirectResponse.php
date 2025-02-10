<?php

namespace App\Actions\Linkeable;

use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkGroup;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LinkeableRedirectResponse
{
    public function make(Link|Biolink|LinkGroup $linkeable)
    {
        $redirectHeaders = [
            'Cache-Control' => 'no-cache, no-store',
            'Expires' => -1,
        ];
        // redirect to long url instantly if link has no pixels attached
        if (!$linkeable->pixels || $linkeable->pixels->isEmpty()) {
            //config()->set('session.driver', 'array');
            $destination = $this->addUtmToUrl(
                $linkeable->long_url,
                $linkeable->utm,
            );
            return new RedirectResponse($destination, 301, $redirectHeaders);
            // will need to show pixels before redirecting
        } else {
            return response()->view(
                'redirects.direct',
                $data,
                301,
                $redirectHeaders,
            );
        }
    }

    public static function shouldRedirect(
        Link|Biolink|LinkGroup $linkeable,
    ): bool {
        return $linkeable->long_url &&
            ($linkeable instanceof LinkGroup ||
                $linkeable->type === 'direct') &&
            !$linkeable->password;
    }

    private function addUtmToUrl(string $url, ?string $utm): string
    {
        if ($utm) {
            // prefix params with utm_ if needed
            $utm = Str::of($utm)
                ->explode('&')
                ->map(
                    fn($item) => Str::startsWith($item, 'utm_')
                        ? $item
                        : 'utm_' . $item,
                )
                ->implode('&');
            $url .= (parse_url($url, PHP_URL_QUERY) ? '&' : '?') . $utm;
        }
        return $url;
    }
}
