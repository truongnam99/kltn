import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import logistics from './logistics.json';
export default function Test() {
  const uploadDataToFirestore = () => {
    console.log('Upload fire');
    // logistics.forEach(element => {
    //   firestore()
    //     .collection('Logistics')
    //     .add({
    //       ...element,
    //     });
    // });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={uploadDataToFirestore}>
        <Text>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
});
