import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

import {ListEmptyComponent} from '../../../components';
import {activeOpacity} from '../../../components/shared';
import ChatItem from '../components/chat-item';
import useChat from '../hooks/useChat';
import styles from './chat.style';

const Chat = ({navigation}) => {
  const {selectors, handlers} = useChat({navigation});
  const {lastMessages} = selectors;
  const {goToChatDetail} = handlers;

  return (
    <View style={styles.container}>
      <FlatList
        data={lastMessages}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              goToChatDetail(item.item.name, item.item.id, item.item.photoUrl)
            }
            activeOpacity={activeOpacity}>
            <ChatItem {...item.item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Chat;
