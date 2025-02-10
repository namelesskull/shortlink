<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('link_campaign_link', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('link_id')->index();
            $table->integer('link_campaign_id')->index();
            $table->integer('position')->unsigned()->default(0)->index();
            $table->string('animation', 40)->nullable();
            $table->timestamp('leap_until')->nullable();
            $table->timestamps();

            $table->unique(['link_id', 'link_campaign_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('link_campaign_link');
    }
};
