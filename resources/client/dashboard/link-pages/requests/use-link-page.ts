import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {CustomPage} from '@common/admin/custom-pages/custom-page';

export interface FetchCustomPageResponse extends BackendResponse {
  page: CustomPage;
}

export function useLinkPage(pageId?: number | string) {
  const params = useParams();
  if (!pageId) {
    pageId = params.pageId;
  }
  return useQuery({
    queryKey: ['link-page', `${pageId}`],
    queryFn: () => fetchLinkPage(pageId!),
  });
}

function fetchLinkPage(
  slugOrId: number | string,
): Promise<FetchCustomPageResponse> {
  return apiClient.get(`link-page/${slugOrId}`).then(response => response.data);
}
