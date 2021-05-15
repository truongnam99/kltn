import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import ChatItem from '../components/chat-item';
import useHook from '../hook/hooks';

import styles from './chat.style';

const Chat = ({navigation}) => {
  const {selectors} = useHook();
  const {lastMessages} = selectors;

  const goToChatDetail = (title, id, photoUrl) => {
    navigation.push(navigationName.chat.chatDetail, {
      name: title,
      id,
      photoUrl,
    });
  };

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
            activeOpacity={0.9}>
            <ChatItem {...item.item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
      />
    </View>
  );
};

export default Chat;
