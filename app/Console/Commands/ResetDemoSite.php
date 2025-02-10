<?php

namespace App\Console\Commands;

use App\Models\User;
use Artisan;
use Common\Auth\ActiveSession;
use Common\Auth\Permissions\Permission;
use Common\Auth\Permissions\Traits\SyncsPermissions;
use Common\Billing\Invoices\Invoice;
use Common\Billing\Subscription;
use Common\Database\Seeds\DefaultPagesSeeder;
use Common\Localizations\Localization;
use Illuminate\Console\Command;

class ResetDemoSite extends Command
{
    use SyncsPermissions;

    protected $signature = 'demoSite:reset';

    public function handle()
    {
        if (!config('common.site.demo')) {
            $this->error('This is not a demo site.');
            return;
        }

        // reset admin user
        $this->resetAdminUser('admin@admin.com');

        // delete localizations
        app(Localization::class)
            ->get()
            ->each(function (Localization $localization) {
                if (strtolower($localization->name) !== 'english') {
                    $localization->delete();
                }
            });

        // delete active sessions
        ActiveSession::truncate();

        // seed belink demo data
        Artisan::call(SeedDemoData::class);

        // re-seed default custom pages
        app(DefaultPagesSeeder::class)
            ->setContainer(app())
            ->run();

        // delete subscriptions
        Subscription::truncate();
        Invoice::truncate();
        User::query()->update([
            'card_last_four' => null,
            'card_brand' => null,
            'card_expires' => null,
            'stipe_id' => null,
            'paypal_id' => null,
        ]);

        Artisan::call('cache:clear');

        $this->info('Demo site reset successfully');
    }

    private function resetAdminUser($email): User
    {
        /** @var User $admin */
        $admin = app(User::class)
            ->where('email', $email)
            ->first();

        if (!$admin) {
            $admin = User::create([
                'email' => 'admin@admin.com',
                'password' => 'admin',
            ]);
        }

        $adminPermission = app(Permission::class)
            ->where('name', 'admin')
            ->first();

        $resourcePermissions = app(Permission::class)
            ->whereIn('name', [
                'links.create',
                'link_overlays.create',
                'custom_pages.create',
                'biolinks.create',
                'custom_domains.create',
                'link_groups.create',
                'tracking_pixels.create',
            ])
            ->get();

        $resourcePermissions = $resourcePermissions->map(function (
            Permission $permission,
        ) {
            switch ($permission['name']) {
                case 'links.create':
                    $permission['restrictions'] = [
                        ['name' => 'count', 'value' => 500],
                        ['name' => 'click_count', 'value' => 10000],
                    ];
                    break;
                default:
                    $permission['restrictions'] = [
                        ['name' => 'count', 'value' => 100],
                    ];
            }
            return $permission;
        });

        $admin->avatar = null;
        $admin->username = 'admin';
        $admin->first_name = 'Demo';
        $admin->last_name = 'Admin';
        $admin->password = 'admin';
        $admin->save();
        $this->syncPermissions(
            $admin,
            $resourcePermissions->push($adminPermission),
        );

        return $admin;
    }
}
