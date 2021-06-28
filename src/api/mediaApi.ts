import API, {onFailure, onSuccess} from '../config/api';

export function postMedia(fileName: string) {
  return API.post('/api/media/', {fileName}).then(onSuccess).catch(onFailure);
}

export function deleteMedia(id: string) {
  return API.delete(`/api/media/${id}`).then(onSuccess).catch(onFailure);
}
