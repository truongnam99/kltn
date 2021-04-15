import React from 'react';
import {View} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from '../../components/ImagPicker/image-picker';

export default function Test() {
  const file = storage().ref('/aaaaaa/ztlqpjby.jpg');
  const log = async () => {
    console.log('ssssssssss', await file.getMetadata());

    console.log('ssssssssss', await file.getDownloadURL());
  };
  log();
  return (
    <View>
      {/* <ConfirmCode /> */}
      {/* <ImagePicker /> */}
    </View>
  );
}
