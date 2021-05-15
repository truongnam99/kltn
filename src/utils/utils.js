import storage from '@react-native-firebase/storage';
import numeral from 'numeral';
import {Linking, Alert} from 'react-native';

import province from '../constants/provice.json';

export const generateId = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 32; i++) {
    id += alphabet[Math.round(Math.random() * alphabet.length)];
  }
  return id;
};

export const uploadImageIntoFirebase = async image => {
  const imageExtensionName = image.split('.')[image.split('.').length - 1];
  const imageUpload = `${'images'}/${generateId()}.${imageExtensionName}`;

  const reference = storage().ref(imageUpload);
  try {
    await reference.putFile(image);
  } catch (error) {
    console.log(error);
  }
  return reference;
};

export const numeralPrice = value => {
  return numeral(value).format('0,000,000,000');
};

export const dial = async phoneNumber => {
  const pn = unFormatString(phoneNumber, 'phoneNumber');
  if (!pn) {
    Alert.alert('No phone number');
  }
  const canOpen = await Linking.canOpenURL(`tel:${pn}`);
  if (canOpen) {
    Linking.openURL(`tel:${pn}`);
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
  }
};

export const getCites = () => {
  return province.map(item => {
    return {value: item.Id, label: item.Name};
  });
};

export const cities = getCites();

export const getDistricts = cityId => {
  return province
    .find(p => p.Id === cityId)
    ?.Districts.map(d => {
      return {
        value: d.Id,
        label: d.Name,
      };
    });
};

export const getCity = cityId => {
  if (!cityId) {
    return null;
  }
  return province.find(p => p.Id === cityId);
};

export const formatString = (value, type) => {
  if (typeof value !== 'string') {
    return value;
  }
  switch (type) {
    case 'phoneNumber':
      value = value.trim();
      value = value.replace('+84', '0');
      if (value[4] && value[4] !== ' ') {
        value = `${value.slice(0, 4)} ${value.slice(4)}`;
      }
      if (value[8] && value[8] !== ' ') {
        value = `${value.slice(0, 8)} ${value.slice(8)}`;
      }
      return value;
    case 'currency':
      return numeralPrice(value);
    default:
      return value;
  }
};

export const unFormatString = (value, type) => {
  if (typeof value !== 'string') {
    return value;
  }
  switch (type) {
    case 'phoneNumber':
      if (value[0] === '0') {
        value = `+84${value.slice(1)}`;
      }
      value = value.replace(/ /g, '');
      return value;
    case 'currency':
      return +value.replace(/,/g, '');
    default:
      break;
  }
};

export const isPhoneNumber = phoneNumber => {
  return phoneNumber.match(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g);
};
