import storage from '@react-native-firebase/storage';
import {generateId} from '../utils/utils';

export const uploadImagesToFirebase = images => {
  if (!images && !images.length) {
    return null;
  }
  const promises = [];
  images.forEach(image => {
    const promise = new Promise((resolve, reject) => {
      if (!image || !image.startsWith('file://')) {
        resolve(image);
      } else {
        const imageExtensionName = image.split('.')[
          image.split('.').length - 1
        ];
        const imageUploadFile = `${'images'}/${generateId()}.${imageExtensionName}`;
        const uploadTask = storage().ref(imageUploadFile).putFile(image);
        uploadTask
          .then(() => resolve(uploadTask.snapshot.ref.getDownloadURL()))
          .catch(error => reject(error));
      }
    });
    promises.push(promise);
  });

  return Promise.all(promises);
};
