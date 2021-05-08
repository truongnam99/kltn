import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {changeMessage} from '../../../store/actions/messageAction';

export const useChatDetail = () => {
  const {message} = useSelector(state => state.messageReducer);
  const {uid} = useSelector(state => state.userReducer.userCredential);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();

  const handleSendMessage = async ({text, messageId, destUser}) => {
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
      return await firestore()
        .collection()
        .add({
          messages: [
            {
              sendAt: firestore.FieldValue.serverTimestamp,
              sendBy: uid,
              text,
            },
          ],
          users: [uid, destUser.id],
          userInfos: [
            {
              id: userInfo.id,
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
