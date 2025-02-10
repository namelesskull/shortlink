<?php

namespace App\Policies;

use App\Models\TrackingPixel;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;

class TrackingPixelPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = TrackingPixel::class;
}
