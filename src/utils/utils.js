import storage from '@react-native-firebase/storage';
import numeral from 'numeral';

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
