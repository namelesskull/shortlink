<?php

namespace App\Actions\Link;

use App\Models\Link;
use Common\Auth\Roles\Role;
use Common\Tags\Tag;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;

class CrupdateLink
{
    public function __construct(protected bool $fetchMetadata = true)
    {
    }

    public function execute(Link $link, array $data): Link
    {
        // make sure there are no more than 2 slashes in the URL
        $longUrl = $data['long_url'];
        $longUrl = preg_replace('/\/{3,}/', '//', $longUrl);

        $scheme = parse_url($longUrl, PHP_URL_SCHEME);
        $longUrl = !$scheme ? "https://$longUrl" : $longUrl;

        $parsedUrl = parse_url($longUrl);

        if (!mb_check_encoding($parsedUrl['host'], 'ASCII')) {
            $asciiHost = idn_to_ascii(
                $parsedUrl['host'],
                0,
                INTL_IDNA_VARIANT_UTS46,
            );
            if ($asciiHost) {
                $longUrl = str_replace(
                    $parsedUrl['host'],
                    $asciiHost,
                    $longUrl,
                );
            }
        }

        $attributes = !$link->exists
            ? array_merge($this->getMetadataFromUrl($longUrl), [
                'user_id' => Auth::id(),
                'hash' => Str::random(5),
                'active' => true,
            ])
            : [];

        $data = $this->filterOutDataBasedOnUserPermissions($data);

        foreach ($data as $key => $value) {
            if ($key === 'long_url') {
                $attributes[$key] = $longUrl;
            } elseif ($key === 'expires_at') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'activates_at') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'active') {
                $attributes[$key] = $value ?? false;
            } elseif ($key === 'type') {
                $attributes[$key] = $value ?? 'direct';
            } elseif ($key === 'type_id') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'utm') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'user_id') {
                $attributes[$key] = $value ?? Auth::id();
            } elseif ($key === 'domain_id') {
                $attributes[$key] = is_int($value) ? $value : null; // can be 0
            } elseif ($key === 'alias') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'name') {
                $attributes[$key] = $value ?? Arr::get($attributes, 'name');
            } elseif ($key === 'image') {
                $attributes[$key] = $value ?? Arr::get($attributes, 'image');
            } elseif ($key === 'description') {
                $attributes[$key] =
                    $value ?? Arr::get($attributes, 'description');
            } elseif ($key === 'name') {
                $attributes[$key] = $value ?? Arr::get($attributes, 'name');
            } elseif ($key === 'animation') {
                $attributes[$key] = $value ?? null;
            } elseif ($key === 'password') {
                $attributes[$key] = $value ?: null;
            } elseif ($key === 'expires_at') {
                // restore link if user has removed expires_at date from expired link
                if (is_null($value)) {
                    $attributes['deleted_at'] = null;
                }
            }
        }

        $link->fill($attributes)->save();

        $this->saveLinkRules($link, $data);

        if (Arr::get($data, 'exp_clicks_rule.key')) {
            $link
                ->rules()
                ->updateOrCreate(
                    ['type' => 'exp_clicks'],
                    $data['exp_clicks_rule'],
                );
        }

        if (isset($data['tags'])) {
            $tags = app(Tag::class)->insertOrRetrieve(
                $data['tags'],
                Tag::DEFAULT_TYPE,
            );
            $link->tags()->sync($tags);
            $link->setRelation('tags', $tags);
        }

        if (isset($data['pixels'])) {
            $link->pixels()->sync(Arr::get($data, 'pixels'));
        }

        if (isset($data['groups'])) {
            $link->groups()->sync(Arr::get($data, 'groups'));
        }

        return $link;
    }

    protected function saveLinkRules(Link $link, array $data): void
    {
        $mergedRules = $data['rules'] ?? null;
        $ruleGroups = ['geo', 'device', 'platform'];

        foreach ($ruleGroups as $groupName) {
            foreach ($data["{$groupName}_rules"] ?? [] as $rule) {
                if (is_null($mergedRules)) {
                    $mergedRules = [];
                }
                $mergedRules[] = [
                    'type' => $groupName,
                    'key' => $rule['key'],
                    'value' => $rule['value'],
                ];
            }
        }

        // if no rules are sent at all, don't do anything, if empty array is sent, clear all rules
        if (!is_null($mergedRules)) {
            $link->rules()->delete();
            $mergedRules = $link->rules()->createMany($mergedRules);
            $link->setRelation('rules', $mergedRules);
        }
    }

    protected function getMetadataFromUrl(string $url): array
    {
        if (!$this->fetchMetadata) {
            return [];
        }

        $parsed = parse_url($url);
        $default = [
            'name' => $parsed['host'] ?? null,
            'description' => null,
            'image' => null,
        ];

        // don't try to parse video or image urls, only html and text
        if (!$this->isTextContent($url)) {
            return [];
        }

        // in case url is not reachable
        try {
            $content = Http::get($url)->body();
        } catch (\Exception $e) {
            return [];
        }

        if (!$content) {
            return [];
        }

        // if JSON response was returned
        if (is_array($content)) {
            return $default;
        }

        $crawler = new Crawler($content);
        $title =
            head($crawler->filter('title')->extract(['_text'])) ?:
            head(
                $crawler
                    ->filter('meta[property="og:title"]')
                    ->extract(['content']),
            );
        $description =
            head(
                $crawler
                    ->filter('meta[name="description"]')
                    ->extract(['content']),
            ) ?:
            head(
                $crawler
                    ->filter('meta[property="og:description"]')
                    ->extract(['content']),
            );
        $image = head(
            $crawler->filter('meta[property="og:image"]')->extract(['content']),
        );

        if (strlen($image) > 200) {
            $image = null;
        }

        return [
            'name' => Str::limit($title ?: $default['name'], 100),
            'description' => $description
                ? Str::limit($description, 180)
                : null,
            'image' => $image ?: null,
        ];
    }

    protected function isTextContent(string $url): bool
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_exec($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);

        return Str::startsWith($info['content_type'] ?? '', 'text');
    }

    private function filterOutDataBasedOnUserPermissions(array $data): array
    {
        $authModel = Auth::user() ?: Role::where('guests', true)->first();

        if ($authModel->hasPermission('admin')) {
            return $data;
        }

        if (!settings('links.enable_type')) {
            $data['type'] = settings()->get('links.default_type', 'direct');
        }

        if (!$authModel->getRestrictionValue('links.create', 'alias')) {
            unset($data['alias']);
        }

        if (!$authModel->getRestrictionValue('links.create', 'expiration')) {
            unset($data['expires_at']);
            unset($data['activates_at']);
            unset($data['exp_clicks_rule']);
        }

        if (!$authModel->getRestrictionValue('links.create', 'password')) {
            unset($data['password']);
        }

        if (!$authModel->getRestrictionValue('links.create', 'utm')) {
            unset($data['utm']);
            unset($data['utm_custom']);
        }

        if (!$authModel->getRestrictionValue('links.create', 'retargeting')) {
            unset($data['device_rules']);
            unset($data['geo_rules']);
            unset($data['platform_rules']);
        }

        return $data;
    }
}
