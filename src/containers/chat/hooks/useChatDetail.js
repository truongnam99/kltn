import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {selectUid, selectUserInfo} from '../../login/selectors';
import {selectMessage} from '../selectors';

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

    if (messageId) {
      return await firestore()
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
      const result = await firestore()
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
      return result;
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
