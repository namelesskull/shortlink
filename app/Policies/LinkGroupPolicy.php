<?php

namespace App\Policies;

use App\Models\LinkGroup;
use App\Models\User;
use Common\Workspaces\ActiveWorkspace;
use Common\Workspaces\Policies\WorkspacedResourcePolicy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class LinkGroupPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkGroup::class;

    public function show(User $currentUser, Model $resource): bool
    {
        // block when trying to access via API and no password is provided
        if ($resource->has_password && !requestIsFromFrontend()) {
            if (
                !request('password') ||
                Hash::make(request('password')) !== $resource->password
            ) {
                return false;
            }
        }

        return (app(ActiveWorkspace::class)->isPersonal() &&
            $resource->active) ||
            parent::show($currentUser, $resource);
    }
}
