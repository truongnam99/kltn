import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components';
import firestore from '@react-native-firebase/firestore';
import {clientIndex} from '../../config/algolia';

import logistics from './logistics.json';
import {showMessageSuccess} from '../../utils/utils';

export default function Test() {
  const onPush = useCallback(async () => {
    try {
      const result = await firestore().collection('Inns').get();
      // console.log('result: ', result.docs[0]);
      result.docs.forEach(async doc => {
        await firestore().collection('Inns').doc(doc.id).update({
          type: 1,
        });
        clientIndex.partialUpdateObject({
          objectID: doc.id,
          type: 1,
        });
      });
      showMessageSuccess('success');
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
