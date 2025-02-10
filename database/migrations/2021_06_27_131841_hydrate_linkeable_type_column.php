<?php

use App\Models\Link;
use App\Models\LinkeableClick;
use App\Models\LinkeableRule;
use Illuminate\Database\Migrations\Migration;

class HydrateLinkeableTypeColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        LinkeableRule::whereNotNull('linkeable_id')->update([
            'linkeable_type' => Link::class,
        ]);

        LinkeableClick::whereNotNull('linkeable_id')->update([
            'linkeable_type' => Link::class,
        ]);

        DB::table('link_tracking_pixel')
            ->whereNotNull('linkeable_id')
            ->update([
                'linkeable_type' => Link::class,
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
