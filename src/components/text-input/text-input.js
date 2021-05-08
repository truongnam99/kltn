import React from 'react';
import {TextInput as RNTextInput, View, Text, StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';
import styles from './text-input.style';

const TextInput = ({
  type = 'normal',
  placeholder,
  title,
  onChangeText,
  containerStyle,
  titleStyle,
  textInputStyle,
  marginTop,
  ...attributes
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {title && (
        <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
          {title}
        </Text>
      )}
      <RNTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={lightTheme.grayC4}
        style={StyleSheet.flatten([
          type === 'outline' ? styles.textInput : styles.textInputOutline,
          textInputStyle,
        ])}
        {...attributes}
      />
    </View>
  );
};

export default TextInput;
