import ApiConstants from '../config/api/ApiConstants';
import API, {onFailure, onSuccess} from '../config/api';

export function getCategoriesAPI(id: string, companyId: string) {
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

export function deleteCategoryAPI(
  id: string,
  userId: string,
  companyId: string,
) {
  let URL = `${ApiConstants.ORDERING_CATEGORY}/${id}`;
  return API.delete(URL, {
    params: {
      companyId,
      userId,
    },
  })
    .then(onSuccess)
    .catch(onFailure);
}

export function saveCategoryAPI(
  userId: string,
  companyId: string,
  categoryName: string,
) {
  let URL = `${ApiConstants.ORDERING_CATEGORY}?userId=${userId}`;
  return API.post(URL, {
    userId: userId,
    companyId: companyId,
    categoryName: categoryName,
  })
    .then(onSuccess)
    .catch(onFailure);
}
