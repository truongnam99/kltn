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
  inputRef,
  required = false,
  hint,
  showHint = true,
  ...attributes
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
            {title}
            {required && <Text style={styles.fieldRequire}>*</Text>}
          </Text>
          {showHint && hint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintStyle}>{hint}</Text>
            </View>
          )}
        </View>
      )}
      <RNTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={lightTheme.grayC4}
        style={StyleSheet.flatten([
          type === 'outline' ? styles.textInput : styles.textInputOutline,
          textInputStyle,
        ])}
        ref={inputRef}
        {...attributes}
      />
    </View>
  );
};

export default React.memo(TextInput);
