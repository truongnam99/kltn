import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';

import styles from './image-view.style';

const ImageView = ({images}) => {
  const firstRowSize = (Dimensions.get('window').width - 60) / 2;
  const anotherRowSize = (Dimensions.get('window').width - 60) / 3;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((file, index) => (
          <Image
            key={index}
            source={{uri: file.uri}}
            style={StyleSheet.flatten([
              styles.imageItem,
              images.length < 3 || index < 2
                ? {width: firstRowSize, height: firstRowSize}
                : {width: anotherRowSize, height: anotherRowSize},
            ])}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageView;
