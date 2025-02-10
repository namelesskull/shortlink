<?php

namespace App\Policies;

use App\Models\LinkDomain;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;

class LinkDomainPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkDomain::class;

    protected string $permissionName = 'custom_domains';
}
