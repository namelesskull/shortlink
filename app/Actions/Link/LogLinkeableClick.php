<?php

namespace App\Actions\Link;

use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkeableClick;
use App\Models\LinkGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Jenssegers\Agent\Agent;
use Torann\GeoIP\Location;

class LogLinkeableClick
{
    public function execute(Link|LinkGroup|Biolink $linkeable): LinkeableClick
    {
        $referrer = request()->server('HTTP_REFERER');
        $agent = app(Agent::class);
        $geo = static::getGeoData();
        $isRobot = $agent->isRobot();

        $attributes = [
            'location' => $geo['iso_code'],
            'city' => $geo['city'],
            'state' => $geo['state'],
            'ip' => request()->ip(),
            'platform' => static::getPlatform(),
            'device' => static::getDevice(),
            'crawler' => $isRobot,
            'browser' => strtolower($agent->browser()),
            'owner_id' => $linkeable->user_id,
            // if referrer was any page from our site set referrer as null
            'referrer' => Str::contains($referrer, url(''))
                ? null
                : Str::limit($referrer, 190, ''),
        ];

        if (!$isRobot) {
            $linkeable->update([
                'clicks_count' => DB::raw('clicks_count + 1'),
                'clicked_at' => now(),
            ]);
        }

        return $linkeable->clicks()->create($attributes);
    }

    public static function getDevice(): string
    {
        $agent = app(Agent::class);
        if ($agent->isTablet()) {
            return 'tablet';
        } elseif ($agent->isMobile()) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }

    public static function getGeoData(): Location
    {
        return geoip(static::getIp());
    }

    public static function getLocation(): string
    {
        return strtolower(static::getGeoData()['iso_code']);
    }

    public static function getPlatform(): string
    {
        $agent = app(Agent::class);
        return strtolower($agent->platform());
    }

    private static function getIp(): ?string
    {
        foreach (
            [
                'HTTP_CF_CONNECTING_IP',
                'HTTP_CLIENT_IP',
                'HTTP_X_FORWARDED_FOR',
                'HTTP_X_FORWARDED',
                'HTTP_X_CLUSTER_CLIENT_IP',
                'HTTP_FORWARDED_FOR',
                'HTTP_FORWARDED',
                'REMOTE_ADDR',
            ]
            as $key
        ) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip); // just to be safe
                    if (
                        filter_var(
                            $ip,
                            FILTER_VALIDATE_IP,
                            FILTER_FLAG_NO_PRIV_RANGE |
                                FILTER_FLAG_NO_RES_RANGE,
                        ) !== false
                    ) {
                        return $ip;
                    }
                }
            }
        }
        return request()->ip();
    }
}
