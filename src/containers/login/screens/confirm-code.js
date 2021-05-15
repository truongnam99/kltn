import React, {useRef, useState} from 'react';
import {Alert, View} from 'react-native';

import {Button, Text, TextInput} from '../../../components';
import styles from './confirm-code.style';
import {translate} from '../../../constants/translate';
import {useHooks} from '../hooks';

const ConfirmCode = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const codeRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const {confirmCode} = handlers;

  const onChangeCode = (value, index) => {
    codes[index] = value;
    setCodes([...codes]);
    if (index < codes.length - 1 && codes[index] !== '') {
      codeRefs[index + 1].current.focus();
    }
  };

  const onConfirmCode = async () => {
    try {
      setIsLoading(true);
      await confirmCode(codes.join(''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text text={translate.enterCode} />
      </View>
      <View style={styles.codeContainer}>
        {codes.map((code, index) => (
          <TextInput
            value={code}
            onChangeText={value => onChangeCode(value, index)}
            keyboardType="numeric"
            textInputStyle={styles.inputCode}
            maxLength={1}
            key={index}
            inputRef={codeRefs[index]}
            selectTextOnFocus={true}
            blurOnSubmit={false}
          />
        ))}
      </View>
      <Button
        title="Confirm"
        containerStyle={styles.buttonContainer}
        onPress={onConfirmCode}
        loading={isLoading}
      />
    </View>
  );
};

export default ConfirmCode;
