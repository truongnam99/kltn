import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {changeMessage} from '../../../store/actions/messageAction';

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
      lastMessages: Object.values(message).map(msg => {
        const user = msg.userInfos.find(ui => ui.id !== uid);
        return {
          ...user,
          id: msg.id,
          ...msg.messages[msg.messages.length - 1],
        };
      }),
      uid,
    },
  };
};

export default useHook;
