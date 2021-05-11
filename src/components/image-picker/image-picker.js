import React, {useState} from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './image-picker.style';
import FastImage from 'react-native-fast-image';

const ImagePicker = ({maxFile = 5, quality = 0.4, onChangeImages}) => {
  const screenWidth = Dimensions.get('window').width;
  const [files, setFiles] = useState([]);
  const [rePickerImageIndex, setRePickerImageIndex] = useState(-1);
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

  const pickerImageCallback = ({
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
      Alert.alert(errorMessage);
      return;
    }
    onChangeImages([...files, {uri, width, height, fileSize, type, fileName}]);
    setFiles([...files, {uri, width, height, fileSize, type, fileName}]);
  };

  const rePickerImageCallback = ({
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
      Alert.alert(errorMessage);
      return;
    }
    files[rePickerImageIndex] = {uri, width, height, fileSize, type, fileName};
    onChangeImages([...files]);
    setFiles([...files]);
  };

  const rePickerImage = index => {
    setRePickerImageIndex(index);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality,
        maxWidth: 360,
      },
      rePickerImageCallback,
    );
  };

  const openImagePicker = () => {
    if (files.length === maxFile) {
      Alert.alert('Max of select');
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
  };

  return (
    <View style={styles.container}>
      {maxFile >= files.length && (
        <View style={styles.imageContainer} onLayout={event => onLayout(event)}>
          {files.map((file, index) => (
            <TouchableOpacity onPress={() => rePickerImage(index)} key={index}>
              <FastImage
                source={{uri: file.uri}}
                style={StyleSheet.flatten([
                  styles.imageItem,
                  files.length < 3 || index < 2
                    ? {width: sizes.firstRowSize, height: sizes.firstRowSize}
                    : {
                        width: sizes.anotherRowSize,
                        height: sizes.anotherRowSize,
                      },
                ])}
              />
            </TouchableOpacity>
          ))}
          {maxFile !== files.length && (
            <View
              style={StyleSheet.flatten([
                styles.addIconContainer,
                files.length < 2
                  ? {width: sizes.firstRowSize, height: sizes.firstRowSize}
                  : {
                      width: sizes.anotherRowSize,
                      height: sizes.anotherRowSize,
                    },
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
      )}
    </View>
  );
};

export default ImagePicker;
