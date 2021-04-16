import React, {useState} from 'react';
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './image-picker.style';

const ImagePicker = ({maxFile = 5}) => {
  const [files, setFiles] = useState([]);
  const [rePickerImageIndex, setRePickerImageIndex] = useState(-1);
  const firstRowSize = (Dimensions.get('window').width - 12) / 2;
  const anotherRowSize = (Dimensions.get('window').width - 18) / 3;

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
    setFiles([...files]);
  };

  const rePickerImage = index => {
    setRePickerImageIndex(index);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.4,
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
        quality: 0.4,
        maxWidth: 360,
      },
      pickerImageCallback,
    );
  };

  return (
    <View style={styles.container}>
      {maxFile >= files.length && (
        <View style={styles.imageContainer}>
          {files.map((file, index) => (
            <TouchableOpacity onPress={() => rePickerImage(index)} key={index}>
              <Image
                source={{uri: file.uri}}
                style={StyleSheet.flatten([
                  styles.imageItem,
                  files.length < 3 || index < 2
                    ? {width: firstRowSize, height: firstRowSize}
                    : {width: anotherRowSize, height: anotherRowSize},
                ])}
              />
            </TouchableOpacity>
          ))}
          {maxFile !== files.length && (
            <View
              style={StyleSheet.flatten([
                styles.addIconContainer,
                files.length < 2
                  ? {width: firstRowSize, height: firstRowSize}
                  : {width: anotherRowSize, height: anotherRowSize},
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
