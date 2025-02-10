import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';
import {linkOverlayEndpoint} from '@app/dashboard/link-overlays/requests/use-link-overlay';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface Response extends BackendResponse {}

export function useUpdateLinkOverlay(
  overlayId: number | string,
  form: UseFormReturn<CrupdateLinkOverlayPayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: CrupdateLinkOverlayPayload) =>
      createOverlay(overlayId, payload),
    onSuccess: () => {
      toast.positive(trans(message('Overlay updated')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('link-overlay'),
      });
      queryClient.invalidateQueries({
        queryKey: [linkOverlayEndpoint(overlayId)],
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createOverlay(
  overlayId: number | string,
  payload: CrupdateLinkOverlayPayload,
): Promise<Response> {
  return apiClient.put(`link-overlay/${overlayId}`, payload).then(r => r.data);
}
