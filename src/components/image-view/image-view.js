import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './image-view.style';

const screenWidth = Dimensions.get('window').width;

const ImageView = ({images}) => {
  const [sizes, setSizes] = useState({
    firstRowSize: screenWidth / 2 - 2,
    anotherRowSize: screenWidth / 3 - 2,
  });

  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setSizes({
      firstRowSize: width / 2 - 2,
      anotherRowSize: width / 3 - 2,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} onLayout={event => onLayout(event)}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageListContainer}>
            <FastImage
              source={{uri: image}}
              style={StyleSheet.flatten([
                styles.imageItem,
                images.length < 3 || index < 2
                  ? {width: sizes.firstRowSize, height: sizes.firstRowSize}
                  : {width: sizes.anotherRowSize, height: sizes.anotherRowSize},
              ])}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ImageView;
