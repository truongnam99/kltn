import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './image-picker.style';
import FastImage from 'react-native-fast-image';
import {showMessageFail, showMessageInfo} from '../../utils/utils';
import {activeOpacity} from '../shared';

let rePickerImageIndex = -1;
const ImagePicker = ({
  maxFile = 5,
  quality = 0.4,
  onChangeImages,
  defaultImages,
  imageStyle,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const [files, setFiles] = useState(defaultImages || []);
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

  const pickerImageCallback = useCallback(
    ({
      didCancel,
      errorMessage,
      uri,
      width,
      height,
      fileSize,
      type,
      fileName,
    }) => {
      if (didCancel) {
        return;
      }
      if (errorMessage) {
        showMessageFail(errorMessage);
        return;
      }
      setFiles([...files, {uri, width, height, fileSize, type, fileName}]);
      onChangeImages([
        ...files,
        {uri, width, height, fileSize, type, fileName},
      ]);
    },
    [onChangeImages, files],
  );

  const rePickerImageCallback = useCallback(
    ({
      didCancel,
      errorMessage,
      uri,
      width,
      height,
      fileSize,
      type,
      fileName,
    }) => {
      if (didCancel) {
        return;
      }
      if (errorMessage) {
        showMessageFail(errorMessage);
        return;
      }
      files[rePickerImageIndex] = {
        uri,
        width,
        height,
        fileSize,
        type,
        fileName,
      };
      setFiles([...files]);
      onChangeImages([...files]);
    },
    [onChangeImages, files],
  );

  const rePickerImage = useCallback(
    index => {
      rePickerImageIndex = index;
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality,
          maxWidth: 360,
        },
        rePickerImageCallback,
      );
    },
    [quality, rePickerImageCallback],
  );

  const openImagePicker = useCallback(() => {
    if (files.length === maxFile) {
      showMessageInfo('Max of select');
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality,
        maxWidth: 360,
      },
      pickerImageCallback,
    );
  }, [files, maxFile, quality, pickerImageCallback]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} onLayout={event => onLayout(event)}>
        {files.map((file, index) => (
          <TouchableOpacity
            onPress={() => rePickerImage(index)}
            key={index}
            activeOpacity={activeOpacity}>
            <FastImage
              source={{uri: file.uri}}
              style={StyleSheet.flatten([
                styles.imageItem,
                maxFile === 1
                  ? {width: '100%', aspectRatio: 1}
                  : files.length < 3 || index < 2
                  ? {width: sizes.firstRowSize, height: sizes.firstRowSize}
                  : {
                      width: sizes.anotherRowSize,
                      height: sizes.anotherRowSize,
                    },
                imageStyle,
              ])}
            />
          </TouchableOpacity>
        ))}
        {maxFile > files.length && (
          <View
            style={StyleSheet.flatten([
              styles.addIconContainer,
              files.length < 2
                ? {width: sizes.firstRowSize, height: sizes.firstRowSize}
                : {
                    width: sizes.anotherRowSize,
                    height: sizes.anotherRowSize,
                  },
              maxFile === 1 && {width: '100%', aspectRatio: 1},
            ])}>
            <TouchableOpacity onPress={() => openImagePicker()}>
              <MaterialIcons
                name="add-photo-alternate"
                size={64}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImagePicker;
