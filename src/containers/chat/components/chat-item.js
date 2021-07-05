import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import database from '@react-native-firebase/database';
import {Image, Text} from '../../../components';

import styles from './chat-item.style';

const ChatItem = ({photoUrl, uid, name, text, readLast}) => {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    database()
      .ref('online/' + uid)
      .once('value', snapshot => {
        setOnline(snapshot.val());
      });
  }, [uid]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image image={photoUrl} style={styles.avatar} isAvata={true} />
        {online && <View style={styles.online} />}
        <View style={styles.column}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={[styles.content, !readLast && styles.bold]}
            numberOfLines={2}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatItem;
