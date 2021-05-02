import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Message from '../components/message';
import useHook from '../hooks';

import styles from './chat-detail.style';

const data = [
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message:
      'Chao anh, day la tin nhan mau cho viec test wrap noi dung trong tin nhan.',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message:
      'Chao anh, Cha Chao anh Chao anho anh Chao anh Chao anh Chao anh Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message: 'Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message:
      'Chao anh, day la tin nhan mau cho viec test wrap noi dung trong tin nhan.',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message:
      'Chao anh, Cha Chao anh Chao anho anh Chao anh Chao anh Chao anh Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: true,
    name: 'truong hoang nam',
    message:
      'Chao anh, day la tin nhan mau cho viec test wrap noi dung trong tin nhan.',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    isMe: false,
    name: 'truong hoang nam',
    message:
      'Chao anh, Cha Chao anh Chao anho anh Chao anh Chao anh Chao anh Chao anh',
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
];

const ChatDetail = ({navigation, route, ...props}) => {
  const {selectors, handlers} = useHook();
  const {messages, uid} = selectors;
  console.log('messages', messages.messages);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages.messages}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <View style={styles.messageItem}>
            <Message {...item} uid={uid} />
          </View>
        )}
        inverted
      />
    </View>
  );
};

export default ChatDetail;
