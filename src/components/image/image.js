import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {lightTheme} from '../../config/theme';
import noImage from '../../assets/images/default_image.png';
import noAvata from '../../assets/images/avata.png';

const Image = ({image, style, isAvata = false}) => {
  const [loading, setLoading] = useState(false);

  const onLoading = () => {
    if (loading) {
      return (
        <View style={[styles.center, style]}>
          <ActivityIndicator size={32} color={lightTheme.primary} />
        </View>
      );
    }
  };

  if (!image) {
    return <FastImage source={isAvata ? noAvata : noImage} style={style} />;
  }

  return (
    <>
      {onLoading()}
      <FastImage
        source={{
          uri: image,
        }}
        style={loading ? null : style}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Image;
