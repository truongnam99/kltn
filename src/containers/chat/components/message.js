import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import styles from './message.style';

const Message = ({sendBy, photoUrl, text, uid}) => {
  return (
    <View style={styles.container}>
      {uid !== sendBy && (
        <View style={styles.leftContainer}>
          <Image source={{uri: photoUrl}} style={styles.image} />
          <Text style={StyleSheet.flatten([styles.text, styles.leftText])}>
            {text}
          </Text>
        </View>
      )}
      {uid === sendBy && (
        <View style={styles.rightContainer}>
          <Text style={StyleSheet.flatten([styles.text, styles.rightText])}>
            {text}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Message;
