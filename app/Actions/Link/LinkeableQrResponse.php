<?php

namespace App\Actions\Link;

use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkGroup;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LinkeableQrResponse
{
    public function make(LinkGroup|Link|Biolink $linkeable): StreamedResponse
    {
        $renderer = new ImageRenderer(
            new RendererStyle(256),
            new SvgImageBackEnd(),
        );
        $writer = new Writer($renderer);
        $response = $writer->writeString("$linkeable->short_url?source=qr");

        return response()->stream(
            function () use ($response) {
                echo $response;
            },
            200,
            [
                'Content-Type' => 'image/svg+xml',
                'Content-Length: ' . strlen($response),
            ],
        );
    }
}
