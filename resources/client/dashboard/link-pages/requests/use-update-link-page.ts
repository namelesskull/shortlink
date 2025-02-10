import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {useParams} from 'react-router-dom';
import {CreateCustomPagePayload} from '@common/admin/custom-pages/requests/use-create-custom-page';
import {CustomPage} from '@common/admin/custom-pages/custom-page';

interface Response extends BackendResponse {
  page: CustomPage;
}

export function useUpdateLinkPage() {
  const {pageId} = useParams();
  return useMutation({
    mutationFn: (payload: CreateCustomPagePayload) =>
      updatePage(pageId!, payload),
    onError: err => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('link-page'),
      });
      toast(message('Page updated'));
    },
  });
}

function updatePage(
  pageId: number | string,
  payload: CreateCustomPagePayload,
): Promise<Response> {
  return apiClient.put(`link-page/${pageId}`, payload).then(r => r.data);
}
