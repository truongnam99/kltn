import React, {useCallback} from 'react';
import {TouchableOpacity, View, Text as RNText, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Avatar, BasePicker, Button, Text, TextInput} from '../../../components';
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

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

const Profile = ({navigation, route}) => {
  const {selectors, handlers} = useHooks({navigation, route});
  const {isMe, user, editable, updateValue, validation, loading} = selectors;
  const {
    onOpenEdit,
    onCancel,
    onUpdateProfile,
    onSignOut,
    onChangeName,
    pickImage,
    updateProfile,
    onChangePhone,
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
            onPress={onSignOut}
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
          value={updateValue.displayName}
          title={translate.name}
          type="outline"
          onChangeText={onChangeName}
          required={true}
          error={validation.displayName}
          showHint={validation.displayName}
          hint="Tên không được để trống"
        />
        <CTextInput
          value={formatString(updateValue.phoneNumber, 'phoneNumber')}
          title={translate.phoneNumber}
          type="outline"
          onChangeText={onChangePhone}
          required={true}
          error={validation.phoneNumber}
          showHint={validation.phoneNumber}
          hint="Số điện thoại không hợp lệ"
          keyboardType="phone-pad"
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
          onDateChange={date => onUpdateProfile(date, 'phoneNumber')}
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
    return (
      <>
        <View style={styles.imageContainer}>
          <Avatar
            source={user.photoURL}
            size="large"
            isShowDetailFullScreen={false}
          />
        </View>
        <CTextInput
          value={user.displayName}
          title={translate.name}
          type="outline"
          editable={false}
        />
        <CTextInput
          value={formatString(user.phoneNumber, 'phoneNumber')}
          title={translate.phoneNumber}
          type="outline"
          editable={false}
        />
        <CTextInput
          value={user.email}
          title={translate.email}
          type="outline"
          editable={false}
        />
        <CTextInput
          title={translate.birthday}
          value={user.birthday}
          type="outline"
          editable={false}
        />
        <CTextInput
          value={getCity(user.homeTown)?.Name}
          title="Quê quán"
          type="outline"
          editable={false}
        />
        <CTextInput
          value={getGender(user.gender)}
          title={translate.gender}
          type="outline"
          editable={false}
        />
        <CTextInput
          value={getProfileJobs(user.job)}
          title={translate.job}
          type="outline"
          editable={false}
        />
      </>
    );
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      {editable ? _renderEditProfile() : _renderProfile()}
      {_renderButton()}
    </ScrollView>
  );
};

export default Profile;
