import React from 'react';
import {StyleSheet, View} from 'react-native';
import {globalStyles} from '../global.style';
import Image from './image/image';
import Text from './text/text';

export const CommentItem = ({user, text, at}) => {
  return (
    <View>
      <View style={globalStyles.row}>
        <Image image={user.photoURL} isAvata={true} style={styles.avata} />
        <View>
          <Text>{user.displayName}</Text>
          <Text types="italic" style={[globalStyles.ml6]}>
            {at}
          </Text>
        </View>
      </View>
      <Text style={styles.fz}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avata: {
    width: 36,
    height: 36,
    borderRadius: 32,
    marginRight: 8,
  },
});
