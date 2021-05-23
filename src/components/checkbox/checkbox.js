import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import RNCCheckBox from '@react-native-community/checkbox';
import Text from '../text/text';
import styles from './checkbox.style';
import {lightTheme} from '../../config/theme';

const CheckBox = ({
  text = '',
  checked = false,
  containerStyle,
  checkboxStyle,
  textStyle,
  onChange,
  types = '',
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <RNCCheckBox
        tintColors={{true: lightTheme.primary, false: lightTheme.primary}}
        value={checked}
        onValueChange={onChange}
        style={StyleSheet.flatten([checkboxStyle])}
      />
      <Text types={types} style={StyleSheet.flatten([styles.text, textStyle])}>
        {text}
      </Text>
    </View>
  );
};

export default memo(CheckBox);
