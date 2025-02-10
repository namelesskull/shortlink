import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {USER_MODEL} from '@common/auth/user';
import {
  LinkOverlayPositions,
  LinkOverlayThemes,
} from '@app/dashboard/link-overlays/crupdate/link-overlay-constants';

export const LinkOverlaysDatatableFilters: BackendFilter[] = [
  {
    key: 'theme',
    label: message('Theme'),
    description: message('Theme for the overlay'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'default',
      options: LinkOverlayThemes.map(theme => ({
        key: theme.key,
        value: theme.key,
        label: theme.label,
      })),
    },
  },
  {
    key: 'position',
    label: message('Position'),
    description: message('Position for the overlay'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'bottom-left',
      options: LinkOverlayPositions.map(position => ({
        key: position.key,
        value: position.key,
        label: position.label,
      })),
    },
  },
  createdAtFilter({
    description: message('Date overlay was created'),
  }),
  updatedAtFilter({
    description: message('Date overlay was last updated'),
  }),
  {
    key: 'user_id',
    label: message('Owner'),
    description: message('User overlay belongs to'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
];
