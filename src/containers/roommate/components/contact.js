import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {navigationName} from '../../../constants/navigation';
import {dial} from '../../../utils/utils';
export const Contact = ({owner, navigation}) => {
  const onChatPress = () => {
    if (owner) {
      navigation.navigate(navigationName.home.chat, {
        screen: navigationName.chat.chatDetail,
        params: {
          name: owner.displayName,
          photoUrl: owner.photoURL,
          destUser: {
            id: owner.uid,
            displayName: owner.displayName,
            photoURL: owner.photoURL,
          },
        },
      });
    }
  };
  const onDialPress = () => {
    if (owner?.phoneNumber) {
      dial(owner?.phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onChatPress}>
        <MaterialIcons
          name="chat"
          size={32}
          color="#0E8DF1"
          style={styles.me16}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onDialPress}>
        <MaterialIcons name="call" size={32} color="#0E8DF1" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  me16: {
    marginEnd: 16,
  },
});
