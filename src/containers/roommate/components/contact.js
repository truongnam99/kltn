import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommentIcon} from '../../../components/icon';
import {activeOpacity} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';
import {navigationName} from '../../../constants/navigation';
import {globalStyles} from '../../../global.style';
import {dial} from '../../../utils/utils';
export const Contact = ({owner, navigation, id, onOpenCommentModal}) => {
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
      <View>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onChatPress}
          style={[globalStyles.row, styles.center]}>
          <MaterialIcons name="chat" size={28} color={lightTheme.primary} />
          <Text style={globalStyles.ml6}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[globalStyles.row, styles.center]}
          onPress={() => onOpenCommentModal(id)}
          activeOpacity={0.8}>
          <CommentIcon size={28} />
          <Text style={globalStyles.ml6}>Bình luận</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onDialPress}
          style={[globalStyles.row, styles.center]}>
          <MaterialIcons name="call" size={28} color={lightTheme.primary} />
          <Text style={globalStyles.ml6}>Gọi điện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  me16: {
    marginEnd: 16,
  },
  center: {
    alignItems: 'center',
  },
});
