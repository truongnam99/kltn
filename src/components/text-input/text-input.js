import React from 'react';
import {TextInput as RNTextInput, View, Text, StyleSheet} from 'react-native';
import styles from './text-input.style';

const TextInput = props => {
  const {
    type = 'normal',
    placeholder,
    title,
    onChangeText,
    containerStyle,
    titleStyle,
    textInputStyle,
    ...attributes
  } = props;
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
