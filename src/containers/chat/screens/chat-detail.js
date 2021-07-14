import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, TouchableOpacity, Modal, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Message from '../components/message';
import {Text, TextInput} from '../../../components';
import dayjs from 'dayjs';

import {lightTheme} from '../../../config/theme';
import {useChatDetail} from '../hooks/useChatDetail';
import {activeOpacity} from '../../../components/shared';
import styles from './chat-detail.style';

const ChatDetail = ({navigation, route}) => {
  const {selectors, handlers} = useChatDetail();
  const [messageId, setMessageId] = useState(route.params.id);
  const [text, setText] = useState();
  const flatList = useRef();
  const {
    handleSendMessage,
    handleReadLastMessage,
    openImagePicker,
    setImage,
  } = handlers;
  const {messages, uid, image} = selectors;
  const message = messages.find(item => item.id === messageId);

  useEffect(() => {
    let tempMessageId = null;
    if (!messageId && messages) {
      for (const msg of messages) {
        if (msg.users.find(item => item === route.params.destUser.id)) {
          tempMessageId = msg.id;
          break;
        }
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

  const onSendMessage = async (type = null) => {
    if (!text && !image) {
      return;
    }
    setText(null);
    await handleSendMessage({
      text,
      type,
      messageId: messageId,
      destUser: route.params.destUser,
      setMessageId,
    });
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
        <TouchableOpacity activeOpacity={0.8} onPress={openImagePicker}>
          <MaterialIcons
            name="add-photo-alternate"
            size={32}
            color={lightTheme.primary}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
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
      <Modal visible={!!image} transparent={true}>
        <View style={styles.sendMessageModel}>
          <View style={styles.sendMessageView}>
            <View style={styles.imagePickerContainer}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={() => setImage(null)}>
                <Ionicons name="close" size={32} color={lightTheme.grayC4} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={() => onSendMessage('image')}>
                <Ionicons name="send" size={32} color={lightTheme.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatDetail;
