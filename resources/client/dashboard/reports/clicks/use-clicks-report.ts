import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {apiClient} from '@common/http/query-client';
import {
  LocationDatasetItem,
  ReportMetric,
} from '@common/admin/analytics/report-metric';
import {BackendResponse} from '@common/http/backend-response/backend-response';

const endpoint = 'reports/clicks';

export interface FetchLinkReportResponse extends BackendResponse {
  report: {
    totalClicks: number;
    clicks: ReportMetric;
    browsers: ReportMetric;
    countries: ReportMetric<LocationDatasetItem>;
    cities: ReportMetric;
    devices: ReportMetric;
    platforms: ReportMetric;
    referrers: ReportMetric;
  };
}

export type ClicksReportMetric =
  | 'clicks'
  | 'devices'
  | 'browsers'
  | 'platforms'
  | 'countries'
  | 'cities'
  | 'referrers';

interface Payload {
  dateRange: DateRangeValue;
  model?: string;
  metrics?: ClicksReportMetric[];
  country?: string | null;
}

interface Options {
  isEnabled: boolean;
}

export function useClicksReport(payload: Payload, options: Options) {
  return useQuery<FetchLinkReportResponse>({
    queryKey: [endpoint, payload],
    queryFn: () => fetchClicksReport(endpoint, payload),
    placeholderData: keepPreviousData,
    enabled: options.isEnabled,
  });
}

function fetchClicksReport<
  T extends FetchLinkReportResponse = FetchLinkReportResponse,
>(endpoint: string, payload: Payload): Promise<T> {
  const params: Record<string, any> = {
    model: payload.model,
    metrics: payload.metrics?.join(','),
    country: payload.country,
  };
  params.startDate = payload.dateRange.start.toAbsoluteString();
  params.endDate = payload.dateRange.end.toAbsoluteString();
  params.timezone = payload.dateRange.start.timeZone;

  return apiClient.get(endpoint, {params}).then(response => response.data);
}
