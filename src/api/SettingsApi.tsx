import API, {onFailure, onSuccess} from '../config/api';
import ApiConstants from '../config/api/ApiConstants';

export function saveProfile(userId: string, dataToSave: any) {
  return API.put(ApiConstants.ACCOUNTS + '/' + userId, dataToSave)
    .then(onSuccess)
    .catch(onFailure);
}

export function changePassword(
  username: string,
  currentPassword: string,
  newPassword: string,
) {
  return API.post(ApiConstants.CHANGE_PASSWORD, {
    username: username,
    currentPassword: currentPassword,
    newPassword: newPassword,
  })
    .then(onSuccess)
    .catch(onFailure);
}
