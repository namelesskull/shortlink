<?php

namespace App\Policies;

use App\Models\LinkPage;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;

class LinkPagePolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkPage::class;
    protected string $permissionName = 'custom_pages';
}
