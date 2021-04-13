import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, TextInput} from '../../../components/index';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import {useHooks} from '../hooks';
import styles from './phone-login.style';

const PhoneLogin = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const {signInWithPhoneNumber} = handlers;
  const [phoneNumber, setPhoneNumber] = useState('+84949709036');

  const checkPhoneNumber = () => {
    if (!phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!checkPhoneNumber()) {
      return;
    }
    await signInWithPhoneNumber(phoneNumber);
    navigation.navigate(navigationName.login.confirmCode);
  };

  const onChangeText = value => {
    console.log(value);
    setPhoneNumber(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phoneNumber}
        title={translate.phoneNumber}
        onChangeText={onChangeText}
      />
      <Button
        title={translate.continue}
        onPress={() => handleSignIn()}
        containerStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
};

export default PhoneLogin;
