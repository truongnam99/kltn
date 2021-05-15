import React, {useRef, useState} from 'react';
import {View, Text as RNText, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';

import {useHooks} from '../hooks';
import {TextInput, Avatar, Text, BasePicker} from '../../../components';
import {translate} from '../../../constants/translate';
import styles from './additional-info.style';
import HeaderAction from '../../../components/header-action/header-action';
import {navigationName} from '../../../constants/navigation';
import {
  cities,
  formatString,
  unFormatString,
  uploadImageIntoFirebase,
} from '../../../utils/utils';
import {gender, profileJobs, role} from '../../../constants/constants';
import {ModalLoading} from '../../../components/modal-loading';

const CTextInput = ({...props}) => {
  return (
    <TextInput
      {...props}
      containerStyle={styles.marginTop}
      textInputStyle={styles.textInputStyle}
    />
  );
};

const AdditionalInfo = ({navigation}) => {
  const {selectors, handlers} = useHooks({navigation});
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const {createUser, handleSetUser} = handlers;
  const {userCredential} = selectors;
  const nameRef = useRef();
  const phoneNumberRef = useRef();

  const [userInfo, setUserInfo] = useState({
    uid: userCredential.uid,
    photoURL: userCredential.photoURL,
    displayName: userCredential.displayName,
    phoneNumber: formatString(userCredential.phoneNumber, 'phoneNumber'),
    email: userCredential.email,
    birthday: userCredential.birthday
      ? moment(userCredential.birthday).format('DD/MM/YYYY')
      : moment().format('DD/MM/YYYY'),
    homeTown: '79',
    role: 0,
    gender: 0,
    job: 1,
  });

  const validateData = () => {
    const errors = [];
    if (!userInfo.displayName) {
      errors.push({ref: nameRef});
    }
    if (!userInfo.phoneNumber) {
      errors.push({ref: phoneNumberRef});
    }
    return errors;
  };

  const handleValidate = () => {
    const errors = validateData();
    if (!errors.length) {
      return true;
    }
    errors[0].ref.current.focus();
    setShowHint(true);
    return false;
  };

  const onDateChange = (dateStr, date) => {
    setUserInfo({
      ...userInfo,
      birthday: moment(date).format('DD/MM/YYYY'),
    });
  };

  const onUpdateUserInfo = (value, field) => {
    let updateValue = value;
    if (field === 'phoneNumber') {
      updateValue = formatString(value, 'phoneNumber');
    }
    setUserInfo({
      ...userInfo,
      [field]: updateValue,
    });
  };

  const pickerImageCallback = ({didCancel, errorMessage, uri}) => {
    if (didCancel) {
      return;
    }
    if (errorMessage) {
      return;
    }
    setUserInfo({
      ...userInfo,
      photoURL: uri,
    });
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.3,
        maxWidth: 100,
      },
      pickerImageCallback,
    );
  };

  const onSave = async () => {
    if (!handleValidate()) {
      return;
    }
    setIsLoading(true);
    let photoURL = userInfo.photoURL;
    if (userInfo.photoURL && !userInfo.photoURL?.startsWith('http')) {
      const result = await uploadImageIntoFirebase(userInfo.photoURL);
      photoURL = await result.getDownloadURL();
    }
    const user = await createUser({
      ...userInfo,
      photoURL,
      phoneNumber: unFormatString(userInfo.phoneNumber, 'phoneNumber'),
    });
    handleSetUser(user);
    navigation.replace(navigationName.homeContainer);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Avatar source={userInfo.photoURL} size="large" />
          <TouchableOpacity onPress={() => pickImage()}>
            <Text
              text={translate.changeAvatar}
              types="italic,underline"
              style={styles.changeAvatar}
            />
          </TouchableOpacity>
        </View>
        <CTextInput
          title={translate.name}
          defaultValue={userInfo.displayName}
          onChangeText={value => onUpdateUserInfo(value, 'displayName')}
          required={true}
          hint={translate.validation.requireName}
          showHint={showHint}
          inputRef={nameRef}
          autoCapitalize="words"
        />
        <CTextInput
          title={translate.phoneNumber}
          defaultValue={userInfo.phoneNumber}
          onChangeText={value => onUpdateUserInfo(value, 'phoneNumber')}
          keyboardType="phone-pad"
          required={true}
          hint={translate.validation.requirePhoneNumber}
          showHint={showHint}
          inputRef={phoneNumberRef}
        />
        <CTextInput
          title={translate.email}
          defaultValue={userInfo.email}
          onChangeText={value => onUpdateUserInfo(value, 'email')}
          keyboardType="email-address"
        />
        <RNText style={styles.birthdayText}>{translate.birthday}</RNText>
        <DatePicker
          mode="date"
          date={moment(userInfo.birthday, 'DD/MM/YYYY')}
          format="DD/MM/YYYY"
          androidMode="spinner"
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
          }}
          style={styles.dateTouchBody}
          onDateChange={(dateStr, date) => onDateChange(dateStr, date)}
        />
        <BasePicker
          items={gender}
          value={userInfo.gender}
          setValue={value => onUpdateUserInfo(value, 'gender')}
          title={translate.gender}
          pickerContainerStype={styles.pickerContainerStype}
        />
        <BasePicker
          value={userInfo.homeTown}
          items={cities}
          title={translate.homeTown}
          setValue={value => onUpdateUserInfo(value, 'homeTown')}
          pickerContainerStype={styles.pickerContainerStype}
        />
        <BasePicker
          title={translate.job}
          items={profileJobs}
          value={userInfo.job}
          pickerContainerStype={styles.pickerContainerStype}
          setValue={value => onUpdateUserInfo(value, 'job')}
        />
        <BasePicker
          title={translate.role}
          items={role}
          value={userInfo.role}
          pickerContainerStype={styles.pickerContainerStype}
          setValue={value => onUpdateUserInfo(value, 'role')}
        />
      </ScrollView>
      <HeaderAction isShowClose={false} onCheck={() => onSave()} />
      <ModalLoading isShow={isLoading} />
    </View>
  );
};

export default AdditionalInfo;
