import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {selectUid, selectUserInfo} from '../../login/selectors';
import {selectMessage} from '../selectors';
import {postMessage} from '../../../service/firebaseService';
import {useCallback, useState} from 'react';
import {showMessageFail} from '../../../utils/utils';
import {uploadImagesToFirebase} from '../../../service/firebaseService';
import {launchImageLibrary} from 'react-native-image-picker';

export const useChatDetail = () => {
  const message = useSelector(selectMessage);
  const uid = useSelector(selectUid);
  const userInfo = useSelector(selectUserInfo);
  const [image, setImage] = useState();

  const handleSendMessage = async ({
    text,
    messageId,
    destUser,
    setMessageId,
    type,
  }) => {
    try {
      let result = null;
      let msg = {
        sendAt: firestore.Timestamp.now(),
        sendBy: uid,
        text,
      };
      if (type === 'image') {
        const tmp = image;
        setImage(null);
        const [img] = await uploadImagesToFirebase([tmp]);
        msg.image = img;
        msg.type = 'image';
      }
      if (messageId) {
        result = await firestore()
          .collection('Messages')
          .doc(messageId)
          .update({
            messages: firestore.FieldValue.arrayUnion(msg),
            readLast: {
              [uid]: true,
              [destUser.id]: false,
            },
          });
      } else {
        result = await firestore()
          .collection('Messages')
          .add({
            messages: [msg],
            users: [uid, destUser.id],
            userInfos: [
              {
                id: userInfo.uid,
                name: userInfo.displayName,
                photoUrl: userInfo.photoURL,
              },
              {
                id: destUser.id,
                name: destUser.displayName,
                photoUrl: destUser.photoURL,
              },
            ],
            readLast: {
              [uid]: true,
              [destUser.id]: false,
            },
          });
        setMessageId(result.id);
      }
      const snapshot = await database()
        .ref('online/' + uid)
        .once('value');
      if (snapshot.val()?.online) {
        postMessage(snapshot.val()?.deviceToken, destUser.displayName, text);
      }
      return result;
    } catch (error) {
      console.log(error);
      showMessageFail('Không gửi được tin nhắn');
    }
  };

  const handleReadLastMessage = async (messageId, payload) => {
    if (messageId) {
      return await firestore()
        .collection('Messages')
        .doc(messageId)
        .update({
          readLast: {
            ...payload,
            [uid]: true,
          },
        });
    }
  };

  const pickerImageCallback = useCallback(({didCancel, errorMessage, uri}) => {
    if (didCancel) {
      return;
    }
    if (errorMessage) {
      showMessageFail(errorMessage);
      return;
    }
    setImage(uri);
  }, []);

  const openImagePicker = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.4,
        maxWidth: 360,
      },
      pickerImageCallback,
    );
  }, [pickerImageCallback]);

  return {
    handlers: {
      handleSendMessage,
      handleReadLastMessage,
      openImagePicker,
      setImage,
    },
    selectors: {
      image,
      messages: Object.values(message),
      uid,
    },
  };
};
