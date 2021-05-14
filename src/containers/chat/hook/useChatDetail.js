import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

export const useChatDetail = () => {
  const {message} = useSelector(state => state.messageReducer);
  const {uid} = useSelector(state => state.userReducer.userCredential);
  const userInfo = useSelector(state => state.userReducer.userInfo);
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
        });
      setMessageId(result.id);
      return result;
    }
  };

  return {
    handlers: {
      handleSendMessage,
    },
    selectors: {
      messages: Object.values(message),
      uid,
    },
  };
};
