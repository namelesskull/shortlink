import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {USER_MODEL} from '@common/auth/user';
import {
  createdAtFilter,
  timestampFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const LinksDatatableFilters: BackendFilter[] = [
  {
    key: 'type',
    label: message('Type'),
    description: message('Type of the link'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Direct'),
          value: 'direct',
        },
        {
          key: '02',
          label: message('Overlay'),
          value: 'overlay',
        },
        {
          key: '03',
          label: message('Frame'),
          value: 'frame',
        },
        {
          key: '04',
          label: message('Custom page'),
          value: 'link_page',
        },
      ],
    },
  },
  {
    key: 'active',
    label: message('Status'),
    description: message('Whether link is disabled or not'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Enabled'),
          value: true,
        },
        {
          key: '02',
          label: message('Disabled'),
          value: false,
        },
      ],
    },
  },
  {
    key: 'password',
    label: message('Password'),
    description: message('Whether link is password protected'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Has a password'),
          value: {value: null, operator: FilterOperator.ne},
        },
        {
          key: '02',
          label: message('Does not have a password'),
          value: {value: null, operator: FilterOperator.eq},
        },
      ],
    },
  },
  {
    key: 'clicks_count',
    label: message('Click count'),
    description: message('Total number of clicks for link'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 1,
    },
  },
  timestampFilter({
    key: 'clicked_at',
    label: message('Clicked at'),
    description: message('Date link was last clicked'),
  }),
  timestampFilter({
    key: 'expires_at',
    label: message('Expires at'),
    description: message('Date link will expire'),
  }),
  createdAtFilter({
    description: message('Date link was created'),
  }),
  updatedAtFilter({
    description: message('Date link was last updated'),
  }),
  {
    key: 'user_id',
    label: message('User'),
    description: message('User link was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
];
