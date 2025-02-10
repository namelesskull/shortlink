import {
  ALL_PRIMITIVE_OPERATORS,
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

export const BiolinksDatatableFilters: BackendFilter[] = [
  {
    key: 'active',
    label: message('Status'),
    description: message('Whether biolink is disabled or not'),
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
    key: 'clicks_count',
    label: message('Clicks count'),
    description: message('Number of times this biolink was visited'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 1,
    },
  },
  {
    key: 'links_count',
    label: message('Link count'),
    description: message('Number of links in the biolink'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 1,
    },
  },
  createdAtFilter({
    description: message('Date biolink was created'),
  }),
  updatedAtFilter({
    description: message('Date biolink was last updated'),
  }),
  {
    key: 'user_id',
    label: message('Owner'),
    description: message('User biolink was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
];
