<?php

namespace App\Policies;

use App\Models\Biolink;

class BiolinkPolicy extends LinkGroupPolicy
{
    protected string $resource = Biolink::class;
}
