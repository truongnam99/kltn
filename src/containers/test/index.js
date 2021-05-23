import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import logistics from './logistics.json';
import {
  ActionButton,
  ActionButtonItem,
} from '../../components/action-button/action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      <ActionButton buttonColor="rgba(231,76,60, 1)">
        <ActionButtonItem title="new" onPress={() => console.log('111111')}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButtonItem>
        <ActionButtonItem
          title="ljljljljkjklj yuih ioio fwefpeiwpri"
          onPress={() => console.log('222')}
          buttonColor="blue">
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButtonItem>
      </ActionButton>
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
