import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './text/text';
import {LogoutIcon} from './icon';

export const LogoutButton = ({
  onPress = () => console.log('you need to set event for logout button'),
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}>
        <LogoutIcon />
        <Text types="h2" style={styles.ml}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginTop: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ml: {
    marginLeft: 6,
  },
});
