import ApiConstants from '../config/api/ApiConstants';
import API, {onFailure, onSuccess} from '../config/api';

export function getCategories(id: string, companyId: string) {
  let URL = `${ApiConstants.ORDERING_CATEGORY}`;
  return API.get(URL, {
    params: {
      companyId,
      id,
    },
  })
    .then(onSuccess)
    .catch(onFailure);
}
