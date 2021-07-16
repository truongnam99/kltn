import React from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../config/theme';

export const Line = ({}) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: lightTheme.grayC4,
    marginVertical: 6,
  },
});
