import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {useParams} from 'react-router-dom';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

export interface FetchBiolinkResponse extends BackendResponse {
  biolink: Biolink;
}

interface FetchBiolinkParams {
  loadContent?: boolean;
}

export const biolinkQueryKey = (
  biolinkId: string | number,
  params?: FetchBiolinkParams,
) => {
  return DatatableDataQueryKey(
    `biolink/${biolinkId}`,
    params as Record<string, string | boolean> | undefined,
  );
};

export function useBiolink() {
  const {biolinkId} = useParams();
  return useQuery({
    queryKey: biolinkQueryKey(biolinkId!),
    queryFn: () => fetchBiolink(biolinkId!),
    initialData: seedInitialDataFromPaginatedList(biolinkId!),
  });
}

export async function fetchBiolink(
  biolinkId: number | string,
  params?: FetchBiolinkParams,
  onLoad?: (data: FetchBiolinkResponse) => void,
): Promise<FetchBiolinkResponse> {
  const response = await apiClient
    .get(`biolink/${biolinkId}`, {params})
    .then(response => response.data);
  onLoad?.(response);
  return response;
}

function seedInitialDataFromPaginatedList(biolinkId: number | string) {
  const biolink = queryClient
    .getQueryData<PaginatedBackendResponse<Biolink>>(
      DatatableDataQueryKey('biolink'),
    )
    ?.pagination?.data.find(link => link.id === +biolinkId);
  return biolink ? {biolink} : undefined;
}
