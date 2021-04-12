import React from 'react';
import {View, Text as RNText, ScrollView} from 'react-native';
import {useHooks} from '../hooks';

import {TextInput, Avatar, Text} from '../../../components';
import {translate} from '../../../constants/translate';
import styles from './additional-info.style';
import {useState} from 'react';
import DatePicker from 'react-native-datepicker';
import HeaderAction from '../../../components/header-action/header-action';

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

const AdditionalInfo = ({navigation}) => {
  const {selectors, handlers} = useHooks({navigation});
  const {updateProfile} = handlers;
  const {user} = selectors;
  const [userInfo, setUserInfo] = useState({
    photoURL: user.photoURL,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    birthday: user.birthday ?? new Date(),
    homeTown: user.homeTown,
    job: user.job,
    social: user.social,
  });

  const onDateChange = (dateStr, date) => {
    setUserInfo({
      ...userInfo,
      birthday: date,
    });
  };

  const onDisplayNameChange = value => {
    setUserInfo({
      ...userInfo,
      displayName: value,
    });
  };

  const onPhoneNumberChange = value => {
    console.log(value);
    setUserInfo({
      ...userInfo,
      phoneNumber: value,
    });
  };

  const onEmailChange = value => {
    setUserInfo({
      ...userInfo,
      email: value,
    });
  };

  const onHomeTownChange = value => {
    setUserInfo({
      ...userInfo,
      homeTown: value,
    });
  };

  const onJobChange = value => {
    setUserInfo({
      ...userInfo,
      job: value,
    });
  };
  const onSocialChange = value => {
    setUserInfo({
      ...userInfo,
      social: value,
    });
  };

  const onSave = async () => {
    await updateProfile(userInfo);
  };

  return (
    <View style={styles.container}>
      <HeaderAction isShowClose={false} onCheck={() => onSave()} />
      <ScrollView style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Avatar source={userInfo.photoURL} size="large" />
          <Text
            text={translate.changeAvatar}
            types="italic,underline"
            style={styles.changeAvatar}
          />
        </View>
        <CTextInput
          title={translate.name}
          defaultValue={userInfo.displayName}
          onChangeText={onDisplayNameChange}
        />
        <CTextInput
          title={translate.phoneNumber}
          defaultValue={userInfo.phoneNumber}
          onChangeText={onPhoneNumberChange}
        />
        <CTextInput
          title={translate.email}
          defaultValue={userInfo.email}
          onChangeText={onEmailChange}
        />
        <RNText style={styles.birthdayText}>{translate.birthday}</RNText>
        <DatePicker
          mode="date"
          date={userInfo.birthday}
          format="DD/MM/YYYY"
          androidMode="spinner"
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
          }}
          style={styles.dateTouchBody}
          onDateChange={(dateStr, date) => onDateChange(dateStr, date)}
        />
        <CTextInput
          title={translate.homeTown}
          onChangeText={onHomeTownChange}
        />
        <CTextInput title={translate.job} onChangeText={onJobChange} />
        <CTextInput title={translate.social} onChangeText={onSocialChange} />
      </ScrollView>
    </View>
  );
};

export default AdditionalInfo;
