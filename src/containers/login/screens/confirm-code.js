import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Button, TextInput} from '../../../components';
import styles from './confirm-code.style';
import {navigationName} from '../../../constants/navigation';
import {useHooks} from '../hooks';

const ConfirmCode = ({navigation}) => {
  const {handlers, selectors} = useHooks({navigation});
  const {handleSetUser} = handlers;
  const [confirm, setConfirm] = useState(null);
  const [code] = useState('');

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const userCredential = await confirm.confirm(code);
      if (userCredential) {
        handleSetUser(userCredential);
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
