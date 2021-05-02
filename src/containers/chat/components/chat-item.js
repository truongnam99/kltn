import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './chat-item.style';

const ChatItem = ({photoUrl, uid, id, name, text, ...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: photoUrl}} style={styles.avatar} />
        <View style={styles.column}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.content} numberOfLines={2}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatItem;
