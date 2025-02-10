<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Models\Link;

class RunAdsRotation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-ads-rotation {linkGroupId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $linkGroupId = $this->argument('linkGroupId');
        $runningLink = Link::whereHas('groups', function ($qry) use ($linkGroupId) {
            $qry->where('link_groups.id', $linkGroupId)
                ->where('link_group_link.ads_rotation_status', 'running');
        })
            ->first();
        if (!$runningLink) {
            $this->error("No running link found for the specified group.");
            return;
        }
        $nextLink = Link::where('created_at', '>', $runningLink->created_at)
            ->orderBy('created_at', 'asc')
            ->first();
        if ($nextLink) {
            $nextLink->groups()->sync([$linkGroupId => ['ads_rotation_status' => 'running']]);
            $runningLink->groups()->sync([$linkGroupId => ['ads_rotation_status' => 'sleep']]);
        }
    }
}
