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

export function updateBillNumberingAPI(
  userId: string,
  companyId: string,
  billNumbering: number,
) {
  let URL = `${ApiConstants.ORDERING}`;
  return API.patch(URL, {
    userId: userId,
    companyId: companyId,
    billNumbering: billNumbering,
  })
    .then(onSuccess)
    .catch(onFailure);
}

export function getQRCodeFile(id: string, userId: string, companyId: string) {
  let URL = `${ApiConstants.DOWNLOAD_QR_CODE}`;
  return API.get(URL, {
    params: {
      id,
      userId,
      companyId,
    },
  })
    .then(onSuccess)
    .catch(onFailure);
}

export function deleteSeatingArrangementAPI(
  id: string,
  userId: string,
  companyId: string,
) {
  let URL = `${ApiConstants.SEATING_ARRANGEMENT}/${id}`;
  return API.delete(URL, {
    params: {
      userId,
      companyId,
    },
  })
    .then(onSuccess)
    .catch(onFailure);
}

export function putSeatingArrangementAPI(
  userId: string,
  companyId: string,
  seatingArrangements: any,
) {
  let URL = `${ApiConstants.ORDERING}`;

  return API.put(URL, {
    userId: userId,
    companyId: companyId,
    seatingArrangements: seatingArrangements,
  })
    .then(onSuccess)
    .catch(onFailure);
}
