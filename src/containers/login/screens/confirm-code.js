import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Button, TextInput} from '../../../components';
import styles from './confirm-code.style';
import {navigationName} from '../../../constants/navigation';

const ConfirmCode = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [code] = useState('');

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('aaaaaaaaa', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const response = await confirm.confirm(code);
      if (response) {
        navigation.navigate(navigationName.findInn.findInn);
        // return addition more info if isNewUser, else go to home
      } else {
        // show message code false
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    signInWithPhoneNumber('+84949709036');
  }, []);

  return (
    <View style={styles.container}>
      <TextInput />
      <Button
        title="Confirm"
        containerStyle={styles.buttonContainer}
        onPress={confirmCode}
      />
    </View>
  );
};

export default ConfirmCode;
