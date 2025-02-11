<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\LinkGroup;
use App\Models\Link;

class RunAdsRotation extends Command
{
    protected $signature = 'app:run-ads-rotation';
    protected $description = 'Ads rotation';

    public function handle()
    {
        try {
            Log::info('Ads rotation started.');

            $linkGroups = LinkGroup::whereNotNull('ads_rotated_at')->get();
            foreach ($linkGroups as $linkGroup) {
                if (substr($linkGroup->ads_rotated_at, 0, 5) == now()->format('H:i')) {
                    $runningLink = Link::whereHas('groups', function ($qry) use ($linkGroup) {
                        $qry->where('link_groups.id', $linkGroup->id)
                            ->where('link_group_link.ads_rotation_status', 'running');
                    })->first();

                    if (!$runningLink) {
                        Log::warning("No running link found for group ID: {$linkGroup->id}");
                        continue;
                    }

                    $nextLink = Link::where('created_at', '>', $runningLink->created_at)
                        ->orderBy('created_at', 'asc')
                        ->first();

                    if ($nextLink) {
                        DB::transaction(function () use ($linkGroup, $runningLink, $nextLink) {
                            // Prevent duplicate execution
                            if (!Cache::add('ads_rotation_running', true, now()->addMinutes(5))) {
                                $this->warn('Ads rotation task is already running. Skipping execution.');
                                return;
                            }

                            $nextLink->groups()->sync([$linkGroup->id => ['ads_rotation_status' => 'running']]);
                            $runningLink->groups()->sync([$linkGroup->id => ['ads_rotation_status' => 'sleep']]);
                            Log::info("Rotated ads for group ID: {$linkGroup->id}");
                        });
                    }
                }
            }

            Log::info('Ads rotation completed successfully.');
        } catch (\Throwable $e) {
            Log::error('Ads rotation failed: ' . $e->getMessage());
        } finally {
            Cache::forget('ads_rotation_running'); // Release lock
        }
    }
}

