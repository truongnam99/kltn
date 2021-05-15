import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {lightTheme} from '../config/theme';
export const ModalLoading = ({isShow}) => {
  return (
    <Modal visible={isShow} transparent={true}>
      <View style={styles.center}>
        <ActivityIndicator color={lightTheme.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#0000005F',
  },
  transparent: {},
});
