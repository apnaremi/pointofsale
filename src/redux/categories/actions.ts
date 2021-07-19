import * as types from '../../config/redux/actions/types';
import {IApiOrderingSettingsResponse} from '../../config/models/api';
import {appLog} from '../../utils/helpers';
import {ICategory} from '../../config/models/data';

export function onCategoriesResponse(response: IApiOrderingSettingsResponse) {
  return {
    type: types.CATEGORIES_RESPONSE,
    response: response,
  };
}
