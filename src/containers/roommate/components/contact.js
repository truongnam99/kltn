import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {activeOpacity} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';
import {navigationName} from '../../../constants/navigation';
import {dial, formatString} from '../../../utils/utils';
export const Contact = ({owner, navigation}) => {
  const onChatPress = () => {
    if (owner) {
      navigation.navigate(navigationName.roommate.chat, {
        name: owner.displayName,
        photoUrl: owner.photoURL,
        destUser: {
          id: owner.uid,
          displayName: owner.displayName,
          photoURL: owner.photoURL,
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
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onChatPress}>
        <MaterialIcons
          name="chat"
          size={32}
          color={lightTheme.primary}
          style={styles.me16}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onDialPress}>
        <MaterialIcons name="call" size={32} color={lightTheme.primary} />
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
