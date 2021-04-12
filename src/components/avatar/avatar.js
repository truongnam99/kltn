import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import baseStyles from './avatar.style';
import {lightTheme} from '../../config/theme';

const Avatar = ({
  size = 'small',
  outlined = false,
  source = 'https://reactnative.dev/img/tiny_logo.png',
  onPress,
  containerStyle: passedContainedStyle,
  type = 'circle',
  isShowDetailFullScreen = false,
}) => {
  const [isShowDetail, setShowDetail] = useState(isShowDetailFullScreen);

  const containerStyle = StyleSheet.flatten([
    baseStyles.container,
    {width: size === 'small' ? 32 : 144, height: size === 'small' ? 32 : 144},
    outlined && {borderWidth: 0.4, borderColor: lightTheme.primary},
    type === 'circle' && {borderRadius: 100},
    passedContainedStyle,
  ]);

  const handlePress = evt => {
    if (isShowDetail) {
      setShowDetail(false);
      return;
    }
    if (onPress) {
      onPress(evt);
    } else {
      setShowDetail(true);
    }
  };

  return (
    <View style={!isShowDetail ? containerStyle : baseStyles.detailContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: source,
          }}
          style={
            !isShowDetail
              ? containerStyle
              : !isShowDetailFullScreen
              ? baseStyles.detailImage
              : baseStyles.detailImageFullScreen
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
