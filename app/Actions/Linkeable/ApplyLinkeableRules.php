<?php

namespace App\Actions\Linkeable;

use App\Actions\Link\LogLinkeableClick;
use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkeableRule;
use App\Models\LinkGroup;
use Illuminate\Support\Str;

class ApplyLinkeableRules
{
    public function execute(Link|Biolink|LinkGroup $linkeable)
    {
        if (!settings('links.retargeting')) {
            return $linkeable;
        }

        $location = LogLinkeableClick::getLocation();
        $device = LogLinkeableClick::getDevice();
        $platform = LogLinkeableClick::getPlatform();

        // only apply the first matching rule
        $first = $linkeable->rules->first(function (LinkeableRule $rule) use (
            $location,
            $device,
            $platform,
        ) {
            if ($rule->type === 'geo') {
                return $location === $rule->key;
            } elseif ($rule->type === 'device') {
                return $device === $rule->key;
            } elseif ($rule->type === 'platform') {
                return Str::contains(
                    str_replace(' ', '', $platform),
                    str_replace(' ', '', $rule->key),
                );
            } else {
                return false;
            }
        });

        if ($first) {
            $linkeable->long_url = $first->value;
        }

        return $linkeable;
    }
}
