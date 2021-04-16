import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text as RNText} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Text, TextInput} from '../../../components';
import {translate} from '../../../constants/translate';
import useHooks from '../hooks';
import styles from './profile.style';

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

const Profile = () => {
  const {handlers, selectors} = useHooks();
  const {user} = selectors;

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
      return;
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar
          source={user.photoURL}
          size="large"
          isShowDetailFullScreen={false}
        />
        <TouchableOpacity onPress={() => pickImage()}>
          <Text
            text={translate.changeAvatar}
            types="italic,underline"
            style={styles.changeAvatar}
          />
        </TouchableOpacity>
      </View>
      <CTextInput
        defaultValue={user.displayName}
        title={translate.name}
        type="outline"
      />
      <CTextInput
        defaultValue={user.phoneNumber}
        title={translate.phoneNumber}
        type="outline"
      />
      <CTextInput
        defaultValue={user.email}
        title={translate.email}
        type="outline"
      />
      <RNText style={styles.birthdayText}>{translate.birthday}</RNText>
      <DatePicker
        mode="date"
        date={moment(user.birthday, 'DD/MM/YYYY')}
        format="DD/MM/YYYY"
        androidMode="spinner"
        customStyles={{
          dateInput: styles.dateInput,
          dateText: styles.dateText,
        }}
        style={styles.dateTouchBody}
      />
      <CTextInput
        defaultValue={user.homeTown}
        title={translate.homeTown}
        type="outline"
      />
      <CTextInput
        defaultValue={user.job}
        title={translate.job}
        type="outline"
      />
      <CTextInput
        defaultValue={user.social}
        title={translate.social}
        type="outline"
      />
    </View>
  );
};

export default Profile;
