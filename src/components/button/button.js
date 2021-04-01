import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import {lightTheme} from '../../config/theme';
import baseStyles from './button.styles';

const Button = props => {
  const {
    onPress = () => console.log('Please attach onPress event into button'),
    type = 'solid',
    title,
    titleStyle: passedTitleStyle,
    containerStyle,
    loading = false,
    loadingStyle: passedLoadingStyle,
    disabled = false,
    disabledStyle,
  } = props;

  const handleOnPress = useCallback(
    evt => {
      if (!loading) {
        onPress(evt);
      }
    },
    [loading, onPress],
  );

  const TouchableComponentInternal = Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
  });

  const titleStyle = StyleSheet.flatten([
    baseStyles.title,
    {
      color: type === 'solid' ? 'white' : lightTheme.primary,
    },
    passedTitleStyle,
  ]);

  return (
    <View style={containerStyle}>
      <TouchableComponentInternal onPress={handleOnPress} disabled={disabled}>
        <View
          style={StyleSheet.flatten([
            baseStyles.button,
            type === 'solid'
              ? baseStyles.container
              : baseStyles.outlineContainer,
            disabled &&
              type === 'solid' && {backgroundColor: lightTheme.disabled},
            disabled &&
              type === 'outline' && {borderColor: lightTheme.disabled},
            disabledStyle,
          ])}>
          {loading && (
            <ActivityIndicator
              style={(baseStyles.loading, passedLoadingStyle)}
              color={type === 'solid' ? 'white' : lightTheme.primary}
            />
          )}
          {!loading && typeof title === 'string' && (
            <Text style={titleStyle}>{title}</Text>
          )}
          {!loading && !title && title !== 'string' && title()}
        </View>
      </TouchableComponentInternal>
    </View>
  );
};

export default Button;
