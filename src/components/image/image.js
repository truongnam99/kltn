import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {lightTheme} from '../../config/theme';

const Image = ({image, style}) => {
  const [loading, setLoading] = useState(true);
  const onLoading = () => {
    if (loading) {
      return (
        <View style={[style, styles.center]}>
          <ActivityIndicator size={32} color={lightTheme.primary} />
        </View>
      );
    }
  };

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
