import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import styles from './message.style';

const Message = ({isMe, avatar, name, message}) => {
  return (
    <View style={styles.container}>
      {isMe && (
        <View style={styles.leftContainer}>
          <Image source={{uri: avatar}} style={styles.image} />
          <Text style={StyleSheet.flatten([styles.text, styles.leftText])}>
            {message}
          </Text>
        </View>
      )}
      {!isMe && (
        <View style={styles.rightContainer}>
          <Text style={StyleSheet.flatten([styles.text, styles.rightText])}>
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Message;
