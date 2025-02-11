<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Models\GroupLink;
use App\Models\Link;

class RunAdsRotation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-ads-rotation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ads rotation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $linkGroups = LinkGroup::whereNotNull('ads_rotated_at')->get();
        foreach ($linkGroups as $linkGroup) {
            if ($linkGroup->ads_rotated_at == now()->format('H:i')) {
                $runningLink = Link::whereHas('groups', function ($qry) use ($linkGroup) {
                    $qry->where('link_groups.id', $linkGroup.id)
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
                    $nextLink->groups()->sync([$linkGroup.id => ['ads_rotation_status' => 'running']]);
                    $runningLink->groups()->sync([$linkGroup.id => ['ads_rotation_status' => 'sleep']]);
                }
            }
        }
    }
}
