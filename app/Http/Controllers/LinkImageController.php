<?php

namespace App\Http\Controllers;

use App\Actions\Link\LinkeablePublicPolicy;
use App\Models\Link;
use Carbon\Carbon;
use Common\Core\BaseController;
use Common\Core\Rendering\DetectsCrawlers;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LinkImageController extends BaseController
{
    use DetectsCrawlers;

    public function show(string $hash)
    {
        $link = Link::where('hash', $hash)->firstOrFail();

        if (!app(LinkeablePublicPolicy::class)->isAccessible($link)) {
            abort(403);
        }

        // Don't create image if request is coming from a crawler
        if ($this->isCrawler()) {
            return $link->image;
        }

        if (
            !$link->image ||
            // update automatically generated image once a week
            (Str::contains($link->image, '_auto_') &&
                $link->updated_at->lessThan(Carbon::now()->subWeek()))
        ) {
            $this->generateWebsiteScreenshot($link);
        }

        return redirect("storage/$link->image");
    }

    private function generateWebsiteScreenshot(Link $link)
    {
        $path = "link_images/{$link->hash}_auto_.jpg";

        // todo: fix config('common.site.ssr_enabled')

        if (false) {
            $imageData = $this->captureImageWithNode($link);
        } else {
            $apis = [
                "https://s.wordpress.com/mshots/v1/$link->long_url?w=800",
                "https://api.pagepeeker.com/v2/thumbs.php?size=l&url=$link->long_url",
                "https://api.miniature.io/?width=800&height=600&screen=1024&url=$link->long_url",
                'https://image.thum.io/get/width/600/crop/900/' .
                urldecode($link->long_url),
            ];
            $imageData = Http::get(Arr::random($apis))->body();
        }

        if (isset($imageData)) {
            Storage::disk('public')->put($path, $imageData);
            $link->fill(['image' => $path])->save();
        }
    }

    protected function captureImageWithNode(Link $link)
    {
        $serverUrl = config('common.site.ssr_url') . '/screenshot';
        return Http::post($serverUrl, [
            'url' => $link->long_url,
        ])->body();
    }
}
