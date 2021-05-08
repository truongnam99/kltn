import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {changeMessage} from '../../store/actions/messageAction';

const useHook = () => {
  const {message} = useSelector(state => state.messageReducer);
  const {uid} = useSelector(state => state.userReducer.userCredential);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .where('users', 'array-contains', 'aJbsn5oTk4RDBj99htsG7jtboFE2')
      .onSnapshot(documentSnapshot => {
        dispatch(changeMessage(documentSnapshot.docChanges()));
      });
    return () => subscriber();
  }, []);
  return {
    handlers: {},
    selectors: {
      messages: Object.values(message),
      lastMessages: Object.values(message).map(message => {
        const user = message.userInfos.find(ui => ui.id !== uid);
        return {
          ...user,
          // chatId: message,
          ...message.messages[message.messages.length - 1],
        };
      }),
      uid,
    },
  };
};

export default useHook;
