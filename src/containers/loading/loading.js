import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import styles from './loading.style';
import {lightTheme} from '../../config/theme';

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={lightTheme.primary} size={32} />
    </View>
  );
};

export default Loading;
