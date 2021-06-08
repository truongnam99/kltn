import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {navigationName} from '../../../constants/navigation';
import {selectUid} from '../../login/selectors';
import {selectMessage} from '../selectors';

const useChat = ({navigation}) => {
  const message = useSelector(selectMessage);
  const uid = useSelector(selectUid);

  const goToChatDetail = useCallback(
    (title, id, photoUrl) => {
      navigation.push(navigationName.chat.chatDetail, {
        name: title,
        id,
        photoUrl,
      });
    },
    [navigation],
  );

  return {
    handlers: {
      goToChatDetail,
    },
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

export default useChat;
