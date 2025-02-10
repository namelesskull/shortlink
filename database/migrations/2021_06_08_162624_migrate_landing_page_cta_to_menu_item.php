<?php

use Illuminate\Database\Migrations\Migration;

class MigrateLandingPageCtaToMenuItem extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = settings('homepage.appearance');
        if ($config) {
            $config['actions']['cta1'] = [
                'label' => $config['actions']['cta1'],
                'action' => '/login',
                'type' => 'route',
            ];
            $config['actions']['cta2'] = [
                'label' => $config['actions']['cta2'],
                'action' => '.first-secondary-feature',
                'type' => 'scrollTo',
            ];
            settings()->save([
                'homepage.appearance' => $config,
            ]);
        }
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
