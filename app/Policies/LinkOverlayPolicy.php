<?php

namespace App\Policies;

use App\Models\LinkOverlay;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;

class LinkOverlayPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkOverlay::class;
}
