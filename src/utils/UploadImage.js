import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import {postMedia} from '../api/mediaApi';
// import { updateAvatar } from '../api/auth';

const getContentType = extension => {
  let mimeType;
  if (extension.includes('jpg') || extension.includes('jpeg')) {
    mimeType = 'image/jpeg';
  }
  if (extension.includes('png')) {
    mimeType = 'image/png';
  }
  return mimeType;
};

const uploadImage = async (image, userId) => {
  try {
    const mimeType = getContentType('jpg');

    const fileName = `image_${userId}_${Date.now()}.jpg`;
    const pathToImage =
      Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path;

    // const preSignUrlRes = await post(`/api/media?fileName=${fileName}`);

    const preSignUrlRes = await postMedia(fileName);
    const resData = preSignUrlRes.data;

    if (resData && resData.presignedUrl) {
      const uploadRes = await RNFetchBlob.fetch(
        'PUT',
        resData.presignedUrl,
        {'Content-Type': mimeType},
        RNFetchBlob.wrap(pathToImage),
      );
      if (uploadRes.info().status === 200) {
        return {
          url: resData.media.url,
          id: resData.media.id,
          fileName,
        };
      }
    }
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export default uploadImage;
