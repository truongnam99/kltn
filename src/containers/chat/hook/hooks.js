import {useSelector} from 'react-redux';

const useHook = () => {
  const {message} = useSelector(state => state.messageReducer);
  const {uid} = useSelector(state => state.userReducer.userCredential);

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
