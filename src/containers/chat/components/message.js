import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text} from '../../../components';
import {Preview} from '../../../components/preview';

import styles from './message.style';

const Message = ({sendBy, photoUrl, text, uid, type, image}) => {
  const [imagePicked, setImagePicked] = useState(null);
  return (
    <View style={styles.container}>
      {uid !== sendBy && (
        <View style={styles.leftContainer}>
          <Image image={photoUrl} style={styles.image} isAvata={true} />
          {type === 'image' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setImagePicked(image)}>
              <Image
                image={image}
                style={[styles.imageMessage, styles.leftText]}
              />
            </TouchableOpacity>
          ) : (
            <Text style={StyleSheet.flatten([styles.text, styles.leftText])}>
              {text}
            </Text>
          )}
        </View>
      )}
      {uid === sendBy && (
        <View style={styles.rightContainer}>
          {type === 'image' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setImagePicked(image)}>
              <Image image={image} style={styles.imageMessage} />
            </TouchableOpacity>
          ) : (
            <Text style={StyleSheet.flatten([styles.text, styles.rightText])}>
              {text}
            </Text>
          )}
        </View>
      )}
      <Preview
        images={[imagePicked]}
        visible={!!imagePicked}
        onClose={() => setImagePicked(null)}
      />
    </View>
  );
};

export default Message;
