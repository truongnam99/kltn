import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View, Text as RNText} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Button, Text, TextInput} from '../../../components';
import {getGender, getProfileJobs} from '../../../constants/constants';
import {translate} from '../../../constants/translate';
import {formatString, getCity} from '../../../utils/utils';
import useHooks from '../hooks';
import styles from './profile.style';
import {Contact} from '../../roommate/components/contact';

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

const Profile = ({navigation, route}) => {
  const profile = route.params?.profile;
  console.log('route', profile);
  const {selectors} = useHooks();
  const user = profile ?? selectors.user;

  const pickerImageCallback = ({didCancel, errorMessage, uri}) => {
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

  const onSignOut = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar
          source={user.photoURL}
          size="large"
          isShowDetailFullScreen={false}
        />
        {!profile && (
          <TouchableOpacity onPress={() => pickImage()}>
            <Text types="italic,underline" style={styles.changeAvatar}>
              {translate.changeAvatar}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <CTextInput
        defaultValue={user.displayName}
        title={translate.name}
        type="outline"
      />
      <CTextInput
        defaultValue={formatString(user.phoneNumber, 'phoneNumber')}
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
        date={dayjs(user.birthday, 'DD/MM/YYYY')}
        format="DD/MM/YYYY"
        androidMode="spinner"
        customStyles={{
          dateInput: styles.dateInput,
          dateText: styles.dateText,
        }}
        style={styles.dateTouchBody}
      />
      <CTextInput
        defaultValue={getCity(user.homeTown)?.Name}
        title={translate.homeTown}
        type="outline"
      />
      <CTextInput
        defaultValue={getGender(user.gender)}
        title={translate.gender}
        type="outline"
      />
      <CTextInput
        defaultValue={getProfileJobs(user.job)}
        title={translate.job}
        type="outline"
      />
      {profile && (
        <View>
          <Text>{translate.logistic.contact}</Text>
          <Contact navigation={navigation} owner={user} />
        </View>
      )}
      {!profile && (
        <View style={styles.mt8}>
          <Button title="Logout" onPress={onSignOut} />
        </View>
      )}
    </View>
  );
};

export default Profile;
