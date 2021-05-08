import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {navigationName} from '../../../constants/navigation';
import ChatItem from '../components/chat-item';
import useHook from '../hook/hooks';

import styles from './chat.style';

const data = [
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam1',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?t đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam2',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam3',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    name: 'Truong Hoang Nam',
    lastedText:
      'Anh ơi, Chuyển đồ từ Lê Văn Việt đến KTX Khu B Giá bao nhiêu vậy anh?',
  },
];

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
      />
    </View>
  );
};

export default Chat;
