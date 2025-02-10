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
    protected $signature = 'app:run-ads-rotation {linkGroup}';

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
        $linkGroup = $this->argument('linkGroup');
        $runningLink = Link::whereHas('groups', function ($qry) use ($linkGroup) {
            $qry->where('id', $linkGroup.id)
                ->wherePivot('ads_rotation_status', 'running');
        })
            ->first();
        if (!$runningLink) {
            $this->error("No running link found for the specified group.");
            return;
        }
        $nextLink = Link::where('created_at', '>', $idleLink->created_at)
            ->orderBy('created_at', 'asc')
            ->first();
        if ($nextLink) {
            $nextLink->groups()->updateExistingPivot($linkGroup.id, ['ads_rotation_status', 'running']);
            $runningLink->groups()->updateExistingPivot($linkGroup.id, ['ads_rotation_status', 'sleep']);
        }
    }
}
