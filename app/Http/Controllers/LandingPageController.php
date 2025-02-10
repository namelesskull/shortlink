<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\LinkeableClick;
use App\Models\User;
use Common\Billing\Models\Product;
use Common\Core\BaseController;

class LandingPageController extends BaseController
{
    public function show()
    {
        return $this->renderClientOrApi([
            'pageName' => 'landing-page',
            'data' => [
                'loader' => 'landingPage',
                'stats' => $this->loadStats(),
                'products' => Product::with(['permissions', 'prices'])
                    ->limit(15)
                    ->orderBy('position', 'asc')
                    ->get(),
            ],
        ]);
    }

    public function stats()
    {
        return $this->success([
            'stats' => $this->loadStats(),
        ]);
    }

    protected function loadStats()
    {
        return [
            'links' => Link::count(),
            'clicks' => LinkeableClick::count(),
            'users' => User::count(),
        ];
    }
}
