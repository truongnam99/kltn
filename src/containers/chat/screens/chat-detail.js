import React, {useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from '../components/message';
import {TextInput} from '../../../components';

import styles from './chat-detail.style';
import {lightTheme} from '../../../config/theme';
import {useChatDetail} from '../hook/useChatDetail';

const ChatDetail = ({navigation, route, ...props}) => {
  const {selectors, handlers} = useChatDetail();
  const [text, setText] = useState();
  const flatList = useRef();
  const {handleSendMessage} = handlers;
  const {messages, uid} = selectors;
  const message = messages.find(item => item.id === route.params.id);

  const onSendMessage = async () => {
    await handleSendMessage({
      text,
      messageId: route.params.id,
      destUser: route.params.destUser,
    });
    setText(null);
    flatListScrollToEnd();
  };

  const flatListScrollToEnd = () => {
    flatList.current.scrollToEnd();
  };

  const onChangeText = text => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        onLayout={flatListScrollToEnd}
        data={message.messages}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <View style={styles.messageItem}>
            <Message {...item} uid={uid} photoUrl={route.params.photoUrl} />
          </View>
        )}
      />
      <View style={styles.sendMessageContainer}>
        <TextInput
          placeholder="message..."
          containerStyle={styles.textContainerStyle}
          textInputStyle={styles.textInputStyle}
          value={text}
          onChangeText={onChangeText}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={onSendMessage}>
          <Ionicons name="send" size={32} color={lightTheme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail;
