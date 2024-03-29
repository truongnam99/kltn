import React, {useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Modal} from 'react-native';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';
import {launchImageLibrary} from 'react-native-image-picker';

import {useHooks} from '../hooks';
import {TextInput, Avatar, Text, BasePicker, Button} from '../../../components';
import {translate} from '../../../constants/translate';
import styles from './additional-info.style';
import {navigationName} from '../../../constants/navigation';
import {termsAndPolicies} from '../../../termsAndPolicies';
import {
  cities,
  formatString,
  unFormatString,
  uploadImageIntoFirebase,
} from '../../../utils/utils';
import {gender, profileJobs, role} from '../../../constants/constants';
import {ModalLoading} from '../../../components/modal-loading';
import {globalStyles} from '../../../global.style';

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

  const [acceptedTermsAndPolicies, setAcceptedTermsAndPolicies] = useState(
    false,
  );

  const [userInfo, setUserInfo] = useState({
    uid: userCredential.uid,
    photoURL: userCredential.photoURL,
    displayName: userCredential.displayName,
    phoneNumber: formatString(userCredential.phoneNumber, 'phoneNumber'),
    email: userCredential.email,
    birthday: userCredential.birthday
      ? dayjs(userCredential.birthday).format('DD/MM/YYYY')
      : dayjs().format('DD/MM/YYYY'),
    homeTown: '79',
    role: 1,
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
      birthday: dayjs(date).format('DD/MM/YYYY'),
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
    navigation.reset({
      index: 0,
      routes: [{name: navigationName.homeContainer}],
    });
    setIsLoading(false);
  };

  return (
    <View>
      <ScrollView style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Avatar source={userInfo.photoURL} size="large" />
          <TouchableOpacity onPress={() => pickImage()}>
            <Text types="italic,underline" style={styles.changeAvatar}>
              {translate.changeAvatar}
            </Text>
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
        <Text style={styles.birthdayText}>
          {translate.birthday}
          <Text style={styles.require}>*</Text>
        </Text>
        <DatePicker
          mode="date"
          date={userInfo.birthday ?? new Date()}
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
          titleStyle={[styles.titleStyle, styles.marginTop]}
          required={true}
        />
        <BasePicker
          containerStyle={styles.marginTop}
          value={userInfo.homeTown}
          items={cities}
          title={translate.homeTown}
          setValue={value => onUpdateUserInfo(value, 'homeTown')}
          pickerContainerStype={styles.pickerContainerStype}
          titleStyle={styles.titleStyle}
          required={true}
        />
        <BasePicker
          containerStyle={styles.marginTop}
          title={translate.job}
          items={profileJobs}
          value={userInfo.job}
          pickerContainerStype={styles.pickerContainerStype}
          titleStyle={styles.titleStyle}
          setValue={value => onUpdateUserInfo(value, 'job')}
          required={true}
        />
        <View style={styles.scrollViewLastItem}>
          <Button title="Lưu thông tin" onPress={onSave} />
        </View>
      </ScrollView>
      <ModalLoading isShow={isLoading} />
      <Modal visible={!acceptedTermsAndPolicies} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text types="bold,h2" style={globalStyles.modalHeader}>
              Điều khoản và chính sách ứng dụng
            </Text>
            <ScrollView>
              <Text>{termsAndPolicies}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.buttonAcceptTerm}
              onPress={() => setAcceptedTermsAndPolicies(true)}>
              <Text style={styles.textAcceptTerm}>
                Tôi chấp nhận và đồng ý các điều khoản và chính sách trên
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdditionalInfo;
