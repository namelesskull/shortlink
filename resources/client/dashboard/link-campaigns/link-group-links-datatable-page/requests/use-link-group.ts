import {useQuery} from '@tanstack/react-query';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface FetchLinkGroupResponse extends BackendResponse {
  linkGroup: LinkGroup;
}

export function useLinkGroup(groupId: number | string) {
  return useQuery({
    queryKey: ['link-group', groupId],
    queryFn: () => fetchLinkGroup(groupId),
    initialData: seedInitialDataFromPaginatedList(groupId),
  });
}

function fetchLinkGroup(
  groupId: number | string,
): Promise<FetchLinkGroupResponse> {
  return apiClient.get(`link-group/${groupId}`).then(response => response.data);
}

function seedInitialDataFromPaginatedList(groupId: number | string) {
  const linkGroup = queryClient
    .getQueryData<PaginatedBackendResponse<LinkGroup>>(
      DatatableDataQueryKey('link-group'),
    )
    ?.pagination?.data.find(link => link.id === +groupId);
  return linkGroup ? {linkGroup} : undefined;
}
