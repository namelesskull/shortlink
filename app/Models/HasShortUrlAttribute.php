<?php

namespace App\Models;

trait HasShortUrlAttribute
{
    public function getShortUrlAttribute()
    {
        if (
            $this->domain_id &&
            $this->relationLoaded('domain') &&
            $this->domain
        ) {
            $defaultHost = $this->domain->host;
        } else {
            $defaultHost =
                settings('custom_domains.default_host') ?: config('app.url');
        }

        return $defaultHost . '/' . ($this->alias ?: $this->hash);
    }
}
