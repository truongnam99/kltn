import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components';
import firestore from '@react-native-firebase/firestore';

import logistics from './logistics.json';

export default function Test() {
  const onPush = useCallback(() => {
    try {
      logistics.forEach(item => {
        firestore()
          .collection('Housewares')
          .add({...item, createdAt: firestore.Timestamp.now()});
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Button title="upload" onPress={onPush} />
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
  flex1: {
    // flex: 1,
    height: '50%',
  },
});
