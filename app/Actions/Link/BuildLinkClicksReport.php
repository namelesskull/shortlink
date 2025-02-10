<?php

namespace App\Actions\Link;

use App\Models\Biolink;
use App\Models\Link;
use App\Models\LinkeableClick;
use App\Models\LinkGroup;
use App\Models\User;
use Common\Core\Values\ValueLists;
use Common\Database\Metrics\MetricDateRange;
use Common\Database\Metrics\Partition;
use Common\Database\Metrics\Trend;
use Common\Workspaces\Workspace;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class BuildLinkClicksReport
{
    protected Builder $builder;
    protected array $params = [];
    protected MetricDateRange $dateRange;

    public function execute(array $params): array
    {
        $this->params = $params;
        $this->builder = $this->createBuilder();

        $this->dateRange = new MetricDateRange(
            start: $this->params['startDate'] ?? null,
            end: $this->params['endDate'] ?? null,
            timezone: $this->params['timezone'] ?? null,
        );

        $metrics = explode(',', Arr::get($params, 'metrics', 'clicks'));

        return collect($metrics)
            ->mapWithKeys(function ($metric) {
                $method = sprintf('get%sMetric', ucfirst($metric));
                if (method_exists($this, $method)) {
                    return [$metric => $this->$method()];
                }
                return [$metric => []];
            })
            ->toArray();
    }

    protected function createBuilder(): Builder
    {
        $model = Arr::get($this->params, 'model', '');
        $parts = explode('=', $model);

        // default to clicks for current user if no model is specified, or it's incomplete
        // might send linkeable_click=0, check if variable is set, instead of being truthy
        if (!isset($parts[0]) || !isset($parts[1])) {
            $parts = ['user', Auth::id()];
        }

        $model = modelTypeToNamespace($parts[0]);
        $modelId = (int) $parts[1];

        $builder = null;
        try {
            switch ($model) {
                case LinkeableClick::class:
                    // all clicks, not scoped to any user or resource (for admin area)
                    Gate::authorize('index', Link::class);
                    $builder = LinkeableClick::query();
                    break;
                case Link::class:
                    $link = Link::findOrFail($modelId);
                    Gate::authorize('show', $link);
                    $builder = $link->clicks()->getQuery();
                    break;
                case Biolink::class:
                    $biolink = Biolink::findOrFail($modelId);
                    Gate::authorize('show', $biolink);
                    $builder = $biolink->clicks()->getQuery();
                    break;
                case LinkGroup::class:
                    $linkGroup = app($model)->findOrFail($modelId);
                    Gate::authorize('show', $linkGroup);
                    $builder = $this->groupClicksQuery($linkGroup);
                    break;
                case User::class:
                    if ($modelId !== Auth::id()) {
                        Gate::authorize('show', User::findOrFail($modelId));
                    }
                    $builder = LinkeableClick::where('owner_id', $modelId);
                    break;
                case Workspace::class:
                    $workspace = Workspace::findOrFail($modelId);
                    Gate::authorize('show', $workspace);
                    $builder = LinkeableClick::whereHas(
                        'linkeable',
                        fn(Builder $query) => $query->where(
                            'workspace_id',
                            $modelId,
                        ),
                    );
                    break;
                default:
                    throw new Exception();
            }
        } catch (Exception $e) {
            // default to showing clicks for current user if authorization fails or if there's some other error
            $builder = LinkeableClick::where('owner_id', Auth::id());
        }

        $builder->where('crawler', false);

        if ($country = Arr::get($this->params, 'country')) {
            $builder->where('location', $country);
        }

        return $builder;
    }

    protected function getClicksMetric(): array
    {
        $trend = new Trend($this->builder, dateRange: $this->dateRange);
        $data = $trend->count();

        return [
            'granularity' => $this->dateRange->granularity,
            'total' => array_sum(Arr::pluck($data, 'value')),
            'datasets' => [
                [
                    'label' => __('Clicks'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getDevicesMetric(): array
    {
        return $this->getPartitionMetric('device', 5);
    }

    protected function getBrowsersMetric(): array
    {
        return $this->getPartitionMetric('browser', 8);
    }

    protected function getPlatformsMetric(): array
    {
        return $this->getPartitionMetric('platform', 5);
    }

    protected function getReferrersMetric(): array
    {
        $data = $this->getPartitionMetric('referrer', 40);
        // move direct traffic to the top of the list
        foreach ($data['datasets'] as $key => $dataset) {
            $directIndex = array_search(
                '',
                array_column($dataset['data'], 'label'),
            );
            if ($directIndex !== false) {
                $directData = Arr::pull(
                    $data['datasets'][$key]['data'],
                    $directIndex,
                );
                array_unshift($data['datasets'][$key]['data'], $directData);
            }
        }
        return $data;
    }

    protected function getCountriesMetric(): array
    {
        $metric = $this->getPartitionMetric('location');

        $countries = app(ValueLists::class)->countries();
        $metric['datasets'][0]['data'] = array_map(function ($location) use (
            $countries,
            $metric,
        ) {
            // only short country code is stored in DB, get and return full country name as well
            $location['code'] = strtolower($location['label']);
            $location['label'] = Arr::first(
                $countries,
                fn($country) => $country['code'] === $location['code'],
            )['name'];
            return $location;
        }, $metric['datasets'][0]['data']);

        return $metric;
    }

    protected function getCitiesMetric(): array
    {
        $metric = $this->getPartitionMetric('city');

//        $countries = app(ValueLists::class)->countries();
//        $metric['datasets'][0]['data'] = array_map(function ($result) use (
//            $countries,
//            $metric,
//        ) {
//            // only short country code is stored in DB, get and return full country name as well
//            $result['country_code'] = strtolower($result['location']);
//            $result['country'] = Arr::first(
//                $countries,
//                fn($country) => $country['code'] === $result['country_code'],
//            )['name'];
//            unset($result['location']);
//            return $result;
//        }, $metric['datasets'][0]['data']);

        return $metric;
    }

    protected function getPartitionMetric(
        string $groupBy,
        int $limit = 10,
    ): array {
        return [
            'datasets' => [
                [
                    'label' => __('Clicks'),
                    'data' => (new Partition(
                        $this->builder,
                        groupBy: $groupBy,
                        dateRange: $this->dateRange,
                        limit: $limit,
                    ))->count(),
                ],
            ],
        ];
    }

    protected function groupClicksQuery(LinkGroup $group): Builder
    {
        return LinkeableClick::query()
            ->where('linkeable_type', Link::MODEL_TYPE)
            ->whereIn(
                'linkeable_id',
                fn($q) => $q
                    ->select('link_group_link.link_id')
                    ->from('link_group_link')
                    ->where('link_group_link.link_group_id', $group->id),
            );
    }
}
