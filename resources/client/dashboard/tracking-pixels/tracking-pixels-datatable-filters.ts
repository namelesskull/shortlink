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
import {SupportedTrackingPixels} from '@app/dashboard/tracking-pixels/supported-tracking-pixels';

export const TrackingPixelsDatatableFilters: BackendFilter[] = [
  {
    key: 'type',
    label: message('Type'),
    description: message('Type of the pixel'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      options: SupportedTrackingPixels.map((pixel, index) => {
        return {key: pixel.name, value: pixel.name, label: message(pixel.name)};
      }),
    },
  },
  createdAtFilter({
    description: message('Date pixel was created'),
  }),
  updatedAtFilter({
    description: message('Date pixel was last updated'),
  }),
  {
    key: 'user_id',
    label: message('Owner'),
    description: message('User pixel belongs to'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
];
