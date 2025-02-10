<?php

namespace App\Exceptions;

use App\Models\Link;
use App\Models\LinkGroup;
use Exception;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Support\Responsable;

class LinkRedirectFailed extends Exception implements Responsable
{
    protected Link|LinkGroup $linkOrGroup;
    protected ?string $redirectUrl = null;

    public function toResponse($request)
    {
        if (app(Gate::class)->allows('show', $this->linkOrGroup)) {
            return response()->view(
                'redirects/redirect-error',
                [
                    'message' => $this->getMessage(),
                    'linkOrGroup' => $this->linkOrGroup,
                ],
                403,
            );
        } elseif ($this->redirectUrl) {
            return response()->redirectTo($this->redirectUrl);
        } else {
            abort(404);
        }
    }

    public function setModel(LinkGroup|Link $linkOrGroup): self
    {
        $this->linkOrGroup = $linkOrGroup;
        return $this;
    }

    public function setRedirectUrl(string $url = null): self
    {
        $this->redirectUrl = $url;
        return $this;
    }
}
