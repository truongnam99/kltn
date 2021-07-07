import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {selectUid, selectUserInfo} from '../../login/selectors';
import {selectMessage} from '../selectors';
import {postMessage} from '../../../service/firebaseService';

export const useChatDetail = () => {
  const message = useSelector(selectMessage);
  const uid = useSelector(selectUid);
  const userInfo = useSelector(selectUserInfo);

  const handleSendMessage = async ({
    text,
    messageId,
    destUser,
    setMessageId,
  }) => {
    if (!text) {
      return;
    }

    let result = null;

    if (messageId) {
      result = await firestore()
        .collection('Messages')
        .doc(messageId)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            sendAt: firestore.Timestamp.now(),
            sendBy: uid,
            text,
          }),
          readLast: {
            [uid]: true,
            [destUser.id]: false,
          },
        });
    } else {
      result = await firestore()
        .collection('Messages')
        .add({
          messages: [
            {
              sendAt: firestore.Timestamp.now(),
              sendBy: uid,
              text,
            },
          ],
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

  return {
    handlers: {
      handleSendMessage,
      handleReadLastMessage,
    },
    selectors: {
      messages: Object.values(message),
      uid,
    },
  };
};
