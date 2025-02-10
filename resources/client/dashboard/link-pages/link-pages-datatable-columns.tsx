import {ColumnConfig} from '@common/datatable/column-config';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {FormattedDate} from '@common/i18n/formatted-date';
import React, {Fragment} from 'react';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {LinkPageOptionsTrigger} from '@app/dashboard/link-pages/link-page-options-trigger';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {Tooltip} from '@common/ui/tooltip/tooltip';

export const LinkPagesDatatableColumns: ColumnConfig<CustomPage>[] = [
  {
    key: 'title',
    allowsSorting: true,
    width: 'flex-2 min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="Title" />,
    body: page => (
      <Link target="_blank" to={`/pages/${page.slug}`} className={LinkStyle}>
        {page.title}
      </Link>
    ),
  },
  {
    key: 'user_id',
    allowsSorting: true,
    width: 'flex-2 min-w-140',
    header: () => <Trans message="Owner" />,
    body: page =>
      page.user && (
        <NameWithAvatar
          image={page.user.avatar}
          label={page.user.display_name}
          description={page.user.email}
        />
      ),
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: page => <FormattedDate date={page.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-84 flex-shrink-0',
    visibleInMode: 'all',
    body: page => (
      <Fragment>
        <LinkPageOptionsTrigger page={page} />
        <PermissionAwareButton resource={page} action="update">
          <Tooltip label={<Trans message="Edit page" />}>
            <IconButton
              size="md"
              className="text-muted"
              elementType={Link}
              to={`${page.id}/edit`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </PermissionAwareButton>
      </Fragment>
    ),
  },
];
