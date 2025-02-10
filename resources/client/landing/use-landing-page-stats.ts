import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

const endpoint = 'homepage/stats';

export interface GetLandingPageStatsResponse extends BackendResponse {
  stats: {
    links: number;
    clicks: number;
    users: number;
  };
}

export function useLandingPageStats() {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getLandingPageStats(),
    initialData: () => {
      if (getBootstrapData().loaders?.landingPage?.stats) {
        // @ts-ignore
        return {
          stats: getBootstrapData().loaders!.landingPage!.stats,
        };
      }
    },
  });
}

function getLandingPageStats(): Promise<GetLandingPageStatsResponse> {
  return apiClient.get(endpoint).then(response => response.data);
}
