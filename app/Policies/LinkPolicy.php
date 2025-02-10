<?php

namespace App\Policies;

use App\Models\Link;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;

class LinkPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = Link::class;
}
