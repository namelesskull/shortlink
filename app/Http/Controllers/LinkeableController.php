<?php

namespace App\Http\Controllers;

use App\Actions\Link\LinkeableQrResponse;
use App\Actions\Link\LogLinkeableClick;
use App\Actions\Linkeable\ApplyLinkeableRules;
use App\Actions\Linkeable\LinkeableRedirectResponse;
use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkGroup;
use Common\Core\BaseController;
use Illuminate\Support\Str;

class LinkeableController extends BaseController
{
    public function show(Link|Biolink|LinkGroup $linkeable)
    {
        // load any needed relations
        if ($linkeable instanceof Biolink) {
            $linkeable->loadContent();
        } elseif ($linkeable->type === 'page') {
            $linkeable->load(['customPage']);
        } elseif ($linkeable->type === 'overlay') {
            $linkeable->load(['overlay']);
        }

        (new LogLinkeableClick())->execute($linkeable);
        $linkeable = (new ApplyLinkeableRules())->execute($linkeable);

        if ($linkeable instanceof Biolink) {
            $linkeable->applyLeapLink();
        }

        $data = [
            'linkeable' => $linkeable,
            'loader' => 'linkeablePage',
            'path' => trim(request()->path(), '/'),
        ];

        if (LinkeableRedirectResponse::shouldRedirect($linkeable)) {
            return (new LinkeableRedirectResponse())->make($linkeable);
        }

        if ($linkeable->model_type === Biolink::MODEL_TYPE) {
            $pageName = 'biolink-page';
        } elseif ($linkeable->model_type === LinkGroup::MODEL_TYPE) {
            $pageName = 'link-group-page';
        } else {
            $pageName = 'link-page';
        }

        return $this->renderClientOrApi([
            'pageName' => $pageName,
            'data' => $data,
            'noPrerender' => $linkeable->has_password,
        ]);
    }

    public function qrCode(Link|Biolink|LinkGroup $linkeable)
    {
        return (new LinkeableQrResponse())->make($linkeable);
    }

    public function dashboard(Link|Biolink|LinkGroup $linkeable)
    {
        $route = Str::plural(Str::kebab(class_basename($linkeable)));
        return redirect(url("dashboard/$route/$linkeable->id"));
    }
}
