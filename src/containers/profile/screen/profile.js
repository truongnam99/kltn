import React, {useCallback} from 'react';
import {TouchableOpacity, View, Text as RNText, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {
  Avatar,
  BasePicker,
  Button,
  Text,
  TextInput,
  ConfirmBox,
} from '../../../components';
import {
  gender,
  getGender,
  getProfileJobs,
  profileJobs,
} from '../../../constants/constants';
import {translate} from '../../../constants/translate';
import {cities, formatString, getCity} from '../../../utils/utils';
import useHooks from '../hooks';
import styles from './profile.style';
import {Contact} from '../../roommate/components/contact';
import {ViewProfile} from '../../../components/view-profile';
import {LogoutButton} from '../../../components/logout-button';
import {AboutUs} from '../../../components/about-us';

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

const Profile = ({navigation, route}) => {
  const {selectors, handlers} = useHooks({navigation, route});
  const {
    isMe,
    user,
    editable,
    updateValue,
    validation,
    loading,
    showConfirmLogout,
  } = selectors;
  const {
    onOpenEdit,
    onCancel,
    onUpdateProfile,
    onShowConfirmLogoutBox,
    onChangeName,
    pickImage,
    updateProfile,
    onChangePhone,
    onConfirmLogout,
    onCancelLogout,
  } = handlers;

  const _renderButton = () => {
    if (isMe) {
      return (
        <View style={styles.contact}>
          <Text types="h2">{translate.logistic.contact}</Text>
          <Contact navigation={navigation} owner={user} />
        </View>
      );
    }
    if (editable) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonStyle}
            title="Lưu"
            onPress={updateProfile}
            loading={loading}
          />
          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={styles.buttonSecondaryColor}
            title="Hủy"
            onPress={onCancel}
            disabled={loading}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonStyle}
            title="Chỉnh sửa"
            onPress={onOpenEdit}
          />
          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={styles.buttonSecondaryColor}
            title="Đăng xuất"
            onPress={onShowConfirmLogoutBox}
          />
        </View>
      );
    }
  };

  const _renderEditProfile = useCallback(() => {
    return (
      <>
        <View style={styles.imageContainer}>
          <Avatar
            source={updateValue.photoURL}
            size="large"
            isShowDetailFullScreen={false}
          />
          <TouchableOpacity onPress={() => pickImage()}>
            <Text types="italic,underline" style={styles.changeAvatar}>
              {translate.changeAvatar}
            </Text>
          </TouchableOpacity>
        </View>
        <CTextInput
          value={'updateValue.displayName'}
          title={translate.name}
          type="outline"
          editable={false}
          textInputStyle={styles.uneditable}
        />
        <CTextInput
          textInputStyle={styles.uneditable}
          value={formatString(updateValue.phoneNumber, 'phoneNumber')}
          title={translate.phoneNumber}
          type="outline"
          editable={false}
        />
        <CTextInput
          value={updateValue.email}
          title={translate.email}
          type="outline"
          onChangeText={value => onUpdateProfile(value, 'email')}
        />
        <RNText style={styles.birthdayText}>{translate.birthday}</RNText>
        <DatePicker
          mode="date"
          date={updateValue.birthday}
          format="DD/MM/YYYY"
          androidMode="spinner"
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
          }}
          style={styles.dateTouchBody}
          onDateChange={date => onUpdateProfile(date, 'birthday')}
        />
        <BasePicker
          containerStyle={styles.marginTop}
          value={updateValue.homeTown}
          items={cities}
          title="Quê quán"
          setValue={value => onUpdateProfile(value, 'homeTown')}
          required={true}
          titleStyle={styles.fontSize}
          textStyle={styles.fontSize}
        />
        <BasePicker
          containerStyle={styles.marginTop}
          title={translate.gender}
          items={gender}
          value={updateValue.gender}
          setValue={value => onUpdateProfile(value, 'gender')}
          required={true}
          titleStyle={styles.fontSize}
          textStyle={styles.fontSize}
        />
        <BasePicker
          containerStyle={styles.marginTop}
          title={translate.job}
          items={profileJobs}
          value={updateValue.job}
          setValue={value => onUpdateProfile(value, 'job')}
          required={true}
          titleStyle={styles.fontSize}
          textStyle={styles.fontSize}
        />
      </>
    );
  }, [
    updateValue,
    validation,
    onChangeName,
    onChangePhone,
    pickImage,
    onUpdateProfile,
  ]);

  const _renderProfile = useCallback(() => {
    return <ViewProfile user={user} isMe={!isMe} />;
  }, [user, isMe]);

  return (
    <ScrollView style={styles.container}>
      {_renderProfile()}
      {/* {editable ? _renderEditProfile() : _renderProfile()} */}
      <AboutUs />
      <LogoutButton onPress={onShowConfirmLogoutBox} />
      <ConfirmBox
        title="Bạn có muốn đăng xuất không"
        onConfirm={onConfirmLogout}
        onCancel={onCancelLogout}
        visible={showConfirmLogout}
      />
    </ScrollView>
  );
};

export default Profile;
