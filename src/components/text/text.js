import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import styles from './text.style';

const Text = ({children = '', style, types: passedTypes = 'h2'}) => {
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
      ])}>
      {children}
    </RNText>
  );
};

export default Text;
