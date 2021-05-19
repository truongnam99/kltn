import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {lightTheme} from '../config/theme';

const FooterListComponent = ({isLoading}) => {
  if (!isLoading) {
    return <View style={styles.view} />;
  }
  return <ActivityIndicator color={lightTheme.primary} size={32} />;
};

const styles = StyleSheet.create({
  view: {
    height: 32,
    backgroundColor: 'transparent',
  },
});

export default memo(FooterListComponent);
