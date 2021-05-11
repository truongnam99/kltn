import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';
import {lightTheme} from '../config/theme';

const FooterListComponent = ({isLoading}) => {
  if (!isLoading) {
    return null;
  }
  return <ActivityIndicator color={lightTheme.primary} />;
};

export default memo(FooterListComponent);
