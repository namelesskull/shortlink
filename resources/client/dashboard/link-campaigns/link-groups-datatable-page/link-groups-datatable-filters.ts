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
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const LinkGroupsDatatableFilters: BackendFilter[] = [
  {
    key: 'rotator',
    label: message('Type'),
    defaultOperator: FilterOperator.eq,
    description: message('Type of the group'),
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Default'),
          value: false,
        },
        {
          key: '02',
          label: message('Rotator'),
          value: true,
        },
      ],
    },
  },
  {
    key: 'active',
    label: message('Status'),
    description: message('Whether group is disabled or not'),
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
    key: 'links_count',
    label: message('Link count'),
    description: message('Number of links in the group'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 1,
    },
  },
  createdAtFilter({
    description: message('Date group was created'),
  }),
  updatedAtFilter({
    description: message('Date group was last updated'),
  }),
  {
    key: 'user_id',
    label: message('User'),
    description: message('User group was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
];
