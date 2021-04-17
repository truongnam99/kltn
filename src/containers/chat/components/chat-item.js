import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './chat-item.style';

const ChatItem = ({avatar, name, lastedText, ...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <View style={styles.column}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.content} numberOfLines={2}>
            {lastedText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatItem;
