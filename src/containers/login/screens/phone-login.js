import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, TextInput} from '../../../components/index';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import styles from './phone-login.style';

const PhoneLogin = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('+84949709036');

  const checkPhoneNumber = () => {
    if (!phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (!checkPhoneNumber()) {
      return;
    }

    navigation.navigate(navigationName.login.confirmCode, {
      phoneNumber: phoneNumber,
    });
  };

  const onValueChange = value => {
    setPhoneNumber(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phoneNumber}
        title={translate.phoneNumber}
        onValueChange={onValueChange}
      />
      <Button
        title={translate.continue}
        onPress={handleSignIn}
        containerStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
};

export default PhoneLogin;
