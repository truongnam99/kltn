import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {BasePicker, TextInput} from '.';
import {lightTheme} from '../config/theme';
import {gender, profileJobs} from '../constants/constants';
import {translate} from '../constants/translate';
import {globalStyles} from '../global.style';
import {cities, formatString} from '../utils/utils';
import Avatar from './avatar/avatar';
import Button from './button/button';
import {space2} from './shared';
import Text from './text/text';

const CTextInput = ({...props}) => {
  return <TextInput {...props} containerStyle={styles.marginTop} />;
};

export const ModalUpdateProfile = ({
  visible,
  onClose,
  onSave,
  updateValue,
  pickImage,
  onUpdateProfile,
  loading,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text types="bold,h2" style={globalStyles.modalHeader}>
            Cập nhật thông tin cá nhân
          </Text>
          <ScrollView style={styles.main}>
            <View style={styles.imageContainer}>
              <Avatar
                source={updateValue.photoURL}
                size="large"
                isShowDetailFullScreen={false}
              />
              <TouchableOpacity onPress={pickImage}>
                <Text types="italic,underline" style={styles.changeAvatar}>
                  {translate.changeAvatar}
                </Text>
              </TouchableOpacity>
            </View>
            <CTextInput
              value={updateValue.displayName}
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
          </ScrollView>
          <View style={globalStyles.row}>
            <Button
              onPress={onSave}
              loading={loading}
              title="Lưu"
              buttonStyle={[styles.buttonAcceptTerm, globalStyles.primary]}>
              <Text style={styles.textSave}>Lưu</Text>
            </Button>

            <TouchableOpacity
              style={[styles.buttonAcceptTerm, globalStyles.ml8]}
              onPress={onClose}>
              <Text style={styles.textAcceptTerm}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#c4c4c4a4',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginVertical: 50,
    padding: 10,
    borderRadius: 8,
  },
  buttonAcceptTerm: {
    backgroundColor: lightTheme.grayC4,
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  uneditable: {
    backgroundColor: '#f2f2f2',
    color: lightTheme.grayC4,
  },
  dateTouchBody: {
    width: '100%',
  },
  birthdayText: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 16,
  },
  marginTop: {
    marginTop: space2,
  },
  fontSize: {
    fontSize: 16,
  },
  main: {
    width: '100%',
  },
  dateInput: {
    borderColor: lightTheme.primary,
    borderWidth: 0,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateText: {
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 4,
  },
});
