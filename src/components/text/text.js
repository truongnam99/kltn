import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import styles from './text.style';

const Text = ({
  children = '',
  style,
  types: passedTypes = 'h1',
  ...attributes
}) => {
  const types = passedTypes.split(',');
  return (
    <RNText
      style={StyleSheet.flatten([
        (() => {
          let mapStyle = {};
          types.forEach(element => {
            mapStyle = {
              ...mapStyle,
              ...styles[element],
            };
          });
          return mapStyle;
        })(),
        style,
      ])}
      {...attributes}>
      {children}
    </RNText>
  );
};

export default Text;
