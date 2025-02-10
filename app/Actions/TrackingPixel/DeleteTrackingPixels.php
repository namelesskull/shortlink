<?php

namespace App\Actions\TrackingPixel;

use App\Models\TrackingPixel;
use DB;

class DeleteTrackingPixels
{
    public function execute($pixelIds)
    {
        TrackingPixel::whereIn('id', $pixelIds)->delete();

        // detach deleted pixels from links
        DB::table('link_tracking_pixel')
            ->whereIn('tracking_pixel_id', $pixelIds)
            ->delete();
    }
}
