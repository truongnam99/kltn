import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import styles from './text.style';

const Text = ({text = '', style, types: passedTypes = 'h2,normal'}) => {
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
      {text}
    </RNText>
  );
};

export default Text;
