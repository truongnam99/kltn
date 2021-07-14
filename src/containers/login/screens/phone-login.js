import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import validator from 'validator';

import {Button, TextInput} from '../../../components/index';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import {
  formatString,
  showMessageFail,
  unFormatString,
} from '../../../utils/utils';
import {useHooks} from '../hooks';
import styles from './phone-login.style';

const PhoneLogin = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const {signInWithPhoneNumber} = handlers;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const checkPhoneNumber = () => {
    if (
      !validator.isMobilePhone(
        unFormatString(phoneNumber, 'phoneNumber'),
        'vi-VN',
      )
    ) {
      showMessageFail('Số điện thoại không đúng');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      if (!checkPhoneNumber()) {
        setTimeout(() => inputRef?.current.focus(), 10);
        return;
      }
      await signInWithPhoneNumber(unFormatString(phoneNumber, 'phoneNumber'));
      navigation.navigate(navigationName.login.confirmCode);
    } catch (error) {
      showMessageFail('Không thể đăng nhập bằng số điện thoại này');
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
        inputRef={inputRef}
        value={phoneNumber}
        title={translate.phoneNumber}
        onChangeText={onChangeText}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        returnKeyType="next"
        autoFocus={true}
        onSubmitEditing={() => handleSignIn()}
        placeholder="0369 369 369"
      />
      <Button
        title={translate.continue}
        onPress={() => handleSignIn()}
        containerStyle={styles.button}
        loading={isLoading}
      />
    </View>
  );
};

export default PhoneLogin;
