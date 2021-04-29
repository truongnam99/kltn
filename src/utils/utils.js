import storage from '@react-native-firebase/storage';
import numeral from 'numeral';
import {Linking, Alert} from 'react-native';

export const generateId = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += alphabet[Math.round(Math.random() * alphabet.length)];
  }
  return id;
};

export const uploadImageIntoFirebase = async image => {
  const imageExtensionName = image.split('.')[image.split('.').length - 1];
  const imageUpload = `${'images'}/${generateId()}.${imageExtensionName}`;

  const reference = storage().ref(imageUpload);
  await reference.putFile(image);
  return reference;
};

export const numeralPrice = value => {
  return numeral(value).format('0,000,000,000');
};

export const dial = async phoneNumber => {
  if (!phoneNumber) {
    Alert.alert('No phone number');
  }
  const canOpen = await Linking.canOpenURL(`tel:${phoneNumber}`);
  if (canOpen) {
    Linking.openURL(`tel:${phoneNumber}`);
  } else {
    Alert.alert("Can't open dial");
  }
};

export const openFacebook = async id => {
  if (!id) {
    Alert.alert('No facebook id');
  }
  const canOpen = await Linking.canOpenURL(`fb://profile/${id}`);
  if (canOpen) {
    Linking.openURL(`fb://profile/${id}`);
  } else {
    Linking.openURL('fb://profile/fbid=100009127928095');
    // Alert.alert("Can't open facebook app");
  }
};
