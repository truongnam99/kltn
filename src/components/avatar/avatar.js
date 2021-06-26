import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import baseStyles from './avatar.style';
import {lightTheme} from '../../config/theme';
import FastImage from 'react-native-fast-image';
import Image from '../image/image';

const Avatar = ({
  size = 'small',
  outlined = false,
  source = '',
  onPress,
  containerStyle: passedContainedStyle,
  type = 'circle',
  isShowDetailFullScreen = false,
  isAllowShowFullScreen = false,
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
      isAllowShowFullScreen && setShowDetail(false);
      return;
    }
    if (onPress) {
      onPress(evt);
    } else {
      isAllowShowFullScreen && setShowDetail(true);
    }
  };

  return (
    <View style={!isShowDetail ? containerStyle : baseStyles.detailContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          image={source}
          isAvata={true}
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
