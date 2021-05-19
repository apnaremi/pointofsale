import API, {onFailure, onSuccess} from '../config/api';
import ApiConstants from '../config/api/ApiConstants';

export function saveProfile(userId: string, dataToSave: any) {
  return API.put(ApiConstants.ACCOUNTS + '/' + userId, dataToSave)
    .then(onSuccess)
    .catch(onFailure);
}

export function changePassword(
  userId: string,
  newPassword: string,
  confirmNewPassword: string,
) {
  let URL = `${ApiConstants.ACCOUNTS}/${userId}/password/change`;
  return API.put(URL, {
    password: newPassword,
    passwordConfirmed: confirmNewPassword,
  })
    .then(onSuccess)
    .catch(onFailure);
}
