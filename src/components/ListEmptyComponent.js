import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {translate} from '../constants/translate';

export const ListEmptyComponent = ({loading}) => {
  if (loading) {
    return null;
  }
  return <Text style={styles.center}>{translate.noDataToShow}</Text>;
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});
