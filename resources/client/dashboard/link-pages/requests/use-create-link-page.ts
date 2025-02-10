import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {CreateCustomPagePayload} from '@common/admin/custom-pages/requests/use-create-custom-page';

interface Response extends BackendResponse {
  page: CustomPage;
}

export function useCreateLinkPage() {
  return useMutation({
    mutationFn: (payload: CreateCustomPagePayload) => createPage(payload),
    onError: err => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['link-page']});
      toast(message('Page created'));
    },
  });
}

function createPage(payload: CreateCustomPagePayload): Promise<Response> {
  return apiClient.post('link-page', payload).then(r => r.data);
}
