import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Chat from './screens/chat';
import ChatDetail from './screens/chat-detail';
import {navigationName} from '../../constants/navigation';
import {headerOptions} from '../../config/index';
import {translate} from '../../constants/translate';

const ChatContainer = ({navigation, route, ...props}) => {
  const ChatStack = createStackNavigator();

  return (
    <ChatStack.Navigator screenOptions={headerOptions}>
      <ChatStack.Screen
        name={navigationName.chat.chat}
        component={Chat}
        options={{
          title: translate.chat.chat,
          headerLeft: () => null,
        }}
      />
      <ChatStack.Screen
        name={navigationName.chat.chatDetail}
        component={ChatDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </ChatStack.Navigator>
  );
};

export default ChatContainer;
