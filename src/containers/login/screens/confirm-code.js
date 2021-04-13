import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, TextInput} from '../../../components';
import styles from './confirm-code.style';
import {useHooks} from '../hooks';

const ConfirmCode = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const [code, setCode] = useState('');
  const {confirmCode} = handlers;

  const onChangeText = value => {
    setCode(value);
  };

  return (
    <View style={styles.container}>
      <TextInput onChangeText={onChangeText} />
      <Button
        title="Confirm"
        containerStyle={styles.buttonContainer}
        onPress={() => confirmCode(code)}
      />
    </View>
  );
};

export default ConfirmCode;
