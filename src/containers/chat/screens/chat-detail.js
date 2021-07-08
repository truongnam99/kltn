import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from '../components/message';
import {Text, TextInput} from '../../../components';
import dayjs from 'dayjs';

import {lightTheme} from '../../../config/theme';
import {useChatDetail} from '../hooks/useChatDetail';
import {activeOpacity} from '../../../components/shared';
import styles from './chat-detail.style';

const ChatDetail = ({navigation, route}) => {
  console.log('route: ', route);
  const {selectors, handlers} = useChatDetail();
  const [messageId, setMessageId] = useState(route.params.id);
  const [text, setText] = useState();
  const flatList = useRef();
  const {handleSendMessage, handleReadLastMessage} = handlers;
  const {messages, uid} = selectors;
  const message = messages.find(item => item.id === messageId);

  useEffect(() => {
    let tempMessageId = null;
    if (!messageId && messages) {
      for (const msg of messages) {
        if (msg.users.find(item => item === route.params.destUser.id)) {
          tempMessageId = msg.id;
        }
        break;
      }
      setMessageId(tempMessageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message?.readLast) {
      if (!message.readLast[uid]) {
        handleReadLastMessage(messageId, message.readLast);
      }
    }
  }, [message, messageId, uid, handleReadLastMessage]);

  const onSendMessage = async () => {
    if (!text) {
      return;
    }
    await handleSendMessage({
      text,
      messageId: messageId,
      destUser: route.params.destUser,
      setMessageId,
    });
    setText(null);
    flatListScrollToEnd();
  };

  const flatListScrollToEnd = () => {
    flatList.current.scrollToEnd();
  };

  const onChangeText = value => {
    setText(value);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        onLayout={flatListScrollToEnd}
        data={message?.messages || []}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <View style={styles.messageItem}>
            {dayjs(item.sendAt.toDate()).format('YYYYMMDD') !==
              dayjs(message?.messages[index - 1]?.sendAt.toDate()).format(
                'YYYYMMDD',
              ) && (
              <View style={styles.day}>
                <Text>{dayjs(item.sendAt.toDate()).format('YYYY-MM-DD')}</Text>
              </View>
            )}
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
          returnKeyType="send"
          onSubmitEditing={onSendMessage}
        />
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onSendMessage}>
          <Ionicons name="send" size={32} color={lightTheme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail;
