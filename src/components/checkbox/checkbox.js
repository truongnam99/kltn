import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import RNCCheckBox from '@react-native-community/checkbox';
import Text from '../text/text';
import styles from './checkbox.style';
import {lightTheme} from '../../config/theme';

const CheckBox = props => {
  const {
    text = '',
    checked = false,
    containerStyle,
    checkboxStyle,
    textStyle,
    onChange,
  } = props;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <RNCCheckBox
        tintColors={{true: lightTheme.primary, false: lightTheme.primary}}
        value={checked}
        onValueChange={onChange}
        style={StyleSheet.flatten([checkboxStyle])}
      />
      <Text
        types="h2,bold"
        text={text}
        style={StyleSheet.flatten([styles.text, textStyle])}
      />
    </View>
  );
};

export default CheckBox;
