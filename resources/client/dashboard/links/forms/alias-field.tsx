import {useSettings} from '@common/core/settings/use-settings';
import {useLinkFeatureStatus} from '@app/dashboard/upgrade/use-link-feature-status';
import {SlugEditor} from '@common/ui/slug-editor';
import {Trans} from '@common/i18n/trans';
import {UseFormReturn} from 'react-hook-form';
import {useLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {useDefaultCustomDomainHost} from '@common/custom-domains/use-default-custom-domain-host';
import {NoPermissionButton} from '@common/billing/upgrade/no-permission-button';

interface AliasFieldProps {
  form: UseFormReturn<{hash: string; alias: string} | any>;
  name: 'alias' | 'hash';
}
export function AliasField({form, name}: AliasFieldProps) {
  const {
    links: {alias_min, alias_max},
  } = useSettings();
  const {data} = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data?.domains);
  const {disabled} = useLinkFeatureStatus('alias');
  const {watch, setValue, formState} = form;
  const currentAlias = watch('alias') || watch('hash');
  const aliasError =
    formState.errors.alias?.message || formState.errors.hash?.message;

  return (
    <div className="mb-24">
      <div className="flex items-center">
        <SlugEditor
          host={defaultHost}
          pattern="[A-Za-z0-9\-]+"
          minLength={alias_min}
          maxLength={alias_max}
          value={currentAlias}
          onChange={newAlias => {
            setValue(name, newAlias, {shouldDirty: true});
          }}
          hideButton={disabled}
        />
        {disabled && (
          <NoPermissionButton
            message={
              <Trans message="Your current plan does not include alias editing." />
            }
          />
        )}
      </div>
      {aliasError && (
        <div className="mt-6 text-xs text-danger">{aliasError as string}</div>
      )}
    </div>
  );
}
