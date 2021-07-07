import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
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

export const postMessage = async (deviceToken, userName, message) => {
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }

    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAA3M28g7w:APA91bHLi1WyKFQAlVGA77GhMWI8B-oLOtSwnY3isG3eWOyiUr81S6qoeYKiiuYCyRNWfOm4XuMYAH8K1MQ7letcNeTIXN-qwoGoIiMV1X_LCSb4SpAG-REYs_cIm6F8s6Xwml0ai2Qj',
      }),
      body: JSON.stringify({
        to: deviceToken,
        data: {
          text: userName,
          sendName: message,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
