import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {translate} from '../constants/translate';

export const ListEmptyComponent = ({
  loading,
  title = translate.noDataToShow,
}) => {
  if (loading) {
    return null;
  }
  return <Text style={styles.center}>{title}</Text>;
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});
