import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, Text, TextInput} from '../../../components';
import styles from './confirm-code.style';
import {translate} from '../../../constants/translate';
import {useHooks} from '../hooks';

const ConfirmCode = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const {confirmCode} = handlers;

  const onChangeCode = (value, index) => {
    codes[index] = value;
    setCodes([...codes]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text text={translate.enterCode} />
      </View>
      <View style={styles.codeContainer}>
        {codes.map((code, index) => {
          return (
            <TextInput
              value={code}
              onChangeText={value => onChangeCode(value, index)}
              keyboardType="numeric"
              textInputStyle={styles.inputCode}
              maxLength={1}
              key={index}
            />
          );
        })}
      </View>

      <Button
        title="Confirm"
        containerStyle={styles.buttonContainer}
        onPress={() => confirmCode(codes.join(''))}
      />
    </View>
  );
};

export default ConfirmCode;
