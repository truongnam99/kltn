import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, TextInput} from '../../../components/index';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import {formatString, unFormatString} from '../../../utils/utils';
import {useHooks} from '../hooks';
import styles from './phone-login.style';

const PhoneLogin = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const {signInWithPhoneNumber} = handlers;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkPhoneNumber = () => {
    if (!phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      if (!checkPhoneNumber()) {
        return;
      }
      await signInWithPhoneNumber(unFormatString(phoneNumber, 'phoneNumber'));
      navigation.navigate(navigationName.login.confirmCode);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = value => {
    setPhoneNumber(formatString(value, 'phoneNumber'));
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phoneNumber}
        title={translate.phoneNumber}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
      />
      <Button
        title={translate.continue}
        onPress={() => handleSignIn()}
        containerStyle={styles.button}
        titleStyle={styles.buttonTitle}
        loading={isLoading}
      />
    </View>
  );
};

export default PhoneLogin;
