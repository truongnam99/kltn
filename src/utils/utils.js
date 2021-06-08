import storage from '@react-native-firebase/storage';
import numeral from 'numeral';
import {Linking, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';

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
    showMessageFail('Lỗi upload hình ảnh');
  }
  return reference;
};

export const numeralPrice = value => {
  return numeral(value).format('0,000,000,000');
};

export const shortenPrice = value => {
  switch (true) {
    case value > 1000000:
      return value / 1000000 + 'M';
    case value > 1000:
      return value / 1000 + 'K';
    default:
      return value;
  }
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
  return [
    {value: '', label: 'Chọn Quận/Huyện'},
    ...province
      .find(p => p.Id === cityId)
      ?.Districts.map(d => {
        return {
          value: d.Id,
          label: d.Name,
        };
      })
      .sort((a, b) => (a.label > b.label ? 1 : -1)),
  ];
};

export const getCity = cityId => {
  if (!cityId) {
    return null;
  }
  return province.find(p => p.Id === cityId);
};

export const formatString = (value, type) => {
  if (typeof value === 'number') {
    value = `${value}`;
  }
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

export const shortenCityName = value => {
  if (typeof value !== 'string') {
    return value;
  }
  if (value.startsWith('Tỉnh')) {
    return value.slice(5);
  }
  if (value.startsWith('Thành phố')) {
    return 'TP.' + value.slice(9);
  }
  return value;
};

export const shortenDistrictName = value => {
  if (typeof value !== 'string') {
    return value;
  }
  if (value.startsWith('Quận')) {
    return 'Q. ' + value.slice(5);
  }
  if (value.startsWith('Huyện')) {
    return 'H. ' + value.slice(6);
  }
  return value;
};

export const showMessageFail = (message, options = {}) => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
    ...options,
  });
};

export const showMessageSuccess = (message, options = {}) => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
    ...options,
  });
};

export const showMessageInfo = (message, options = {}) => {
  showMessage({
    message,
    type: 'warning',
    icon: 'info',
  });
};
