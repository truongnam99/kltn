import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import logistics from './logistics.json';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  ActionButton,
  ActionButtonItem,
} from '../../components/action-button/action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '../../components';
export default function Test() {
  const uploadDataToFirestore = () => {
    console.log('Upload file');
    // logistics.forEach(element => {
    //   firestore()
    //     .collection('Logistics')
    //     .add({
    //       ...element,
    //     });
    // });
  };
  // return null;
  return (
    <View style={styles.container}>
      <Button
        title="click"
        onPress={() =>
          showMessage({
            message: 'xin chao',
            type: 'warning',
            icon: 'info',
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4d4d4',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
