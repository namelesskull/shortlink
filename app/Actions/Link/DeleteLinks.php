<?php

namespace App\Actions\Link;

use App\Models\Link;
use App\Models\LinkeableClick;
use App\Models\LinkeableRule;
use DB;
use Illuminate\Support\Collection;

class DeleteLinks
{
    /**
     * @var Link
     */
    private $link;

    /**
     * @param Link $link
     */
    public function __construct(Link $link)
    {
        $this->link = $link;
    }

    /**
     * @param Collection|array $ids
     */
    public function execute($ids, bool $forceDelete = false)
    {
        if ($forceDelete) {
            $this->link->whereIn('id', $ids)->forceDelete();
        } else {
            $this->link->whereIn('id', $ids)->delete();
        }

        if ($forceDelete) {
            // delete clicks
            app(LinkeableClick::class)
                ->whereIn('linkeable_id', $ids)
                ->where('linkeable_type', Link::MODEL_TYPE)
                ->delete();

            // delete rules
            app(LinkeableRule::class)
                ->whereIn('linkeable_id', $ids)
                ->where('linkeable_type', Link::MODEL_TYPE)
                ->delete();

            // detach from groups
            DB::table('link_group_link')
                ->whereIn('link_id', $ids)
                ->delete();
        }
    }
}
