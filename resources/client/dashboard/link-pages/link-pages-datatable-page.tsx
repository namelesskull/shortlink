import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {CustomPageDatatableFilters} from '@common/admin/custom-pages/custom-page-datatable-filters';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {useAuth} from '@common/auth/use-auth';
import React, {useContext, useMemo} from 'react';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import articlesSvg from '@common/admin/custom-pages/articles.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {LinkPagesDatatableColumns} from '@app/dashboard/link-pages/link-pages-datatable-columns';

interface CustomPageDatablePageProps {
  forCurrentUser?: boolean;
}
export function LinkPagesDatatablePage({
  forCurrentUser,
}: CustomPageDatablePageProps) {
  const config = useContext(SiteConfigContext);
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? LinkPagesDatatableColumns
      : LinkPagesDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? CustomPageDatatableFilters(config)
      : CustomPageDatatableFilters(config).filter(
          filter => filter.key !== 'user_id',
        );

    return {filters, columns};
  }, [forCurrentUser, config]);

  const userId = forCurrentUser ? user?.id : '';

  return (
    <DataTablePage
      endpoint="link-page"
      title={<Trans message="Link pages" />}
      filters={filters}
      columns={columns}
      headerContent={<InfoTrigger />}
      headerItemsAlign="items-center"
      queryParams={{userId, with: 'user', workspaceId}}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="customPage" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={articlesSvg}
          title={<Trans message="No link pages have been created yet" />}
          filteringTitle={<Trans message="No matching link pages" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <PermissionAwareButton resource="customPage" action="create">
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="New page" />
      </DataTableAddItemButton>
    </PermissionAwareButton>
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      body={
        <Trans message="Show a transitional page with fully custom markup. Users who visit the short url will briefly see the page before being redirected to destination url." />
      }
    />
  );
}
