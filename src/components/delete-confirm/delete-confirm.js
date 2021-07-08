import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button, Text} from '..';
import {lightTheme} from '../../config/theme';

export const DeleteConfirm = ({
  title,
  description,
  onCancel,
  onConfirm,
  visible,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.center}>
        <Animatable.View style={styles.constainer}>
          <Text types="bold,h2" style={styles.marginBottom}>
            {title}
          </Text>
          <Text style={styles.marginBottom}>{description}</Text>
          <View style={styles.buttonContrainer}>
            <Button
              title="Xác nhận"
              containerStyle={styles.button}
              buttonStyle={styles.buttonDelete}
              onPress={onConfirm}
            />
            <Button
              title="Hủy"
              buttonStyle={styles.buttonCancel}
              containerStyle={[styles.button, styles.buttonDeleteContainer]}
              onPress={onCancel}
            />
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    maxWidth: 280,
  },
  buttonContrainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 100,
  },
  buttonDeleteContainer: {
    marginLeft: 10,
  },
  buttonDelete: {
    backgroundColor: lightTheme.secondary,
  },
  buttonCancel: {
    backgroundColor: lightTheme.grayC4,
  },
  marginBottom: {
    marginBottom: 8,
  },
});
