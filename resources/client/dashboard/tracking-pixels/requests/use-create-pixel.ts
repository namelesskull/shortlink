import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {CrupdatePixelFormValue} from '@app/dashboard/tracking-pixels/crupdate-dialog/crupdate-pixel-form';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface Response extends BackendResponse {}

export function useCreatePixel(form: UseFormReturn<CrupdatePixelFormValue>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: CrupdatePixelFormValue) => createPixel(props),
    onSuccess: () => {
      toast.positive(trans(message('Pixel created')));
      queryClient.invalidateQueries({queryKey: DatatableDataQueryKey('tp')});
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createPixel(payload: CrupdatePixelFormValue): Promise<Response> {
  return apiClient.post('tp', payload).then(r => r.data);
}
