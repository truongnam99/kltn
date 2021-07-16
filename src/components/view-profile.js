import React from 'react';
import {StyleSheet, View} from 'react-native';
import Avatar from './avatar/avatar';
import Text from './text/text';
import {
  BirthdayIcon,
  PhoneIcon,
  EmailIcon,
  HomeIcon,
  GenderIcon,
  JobIcon,
} from './icon';
import {getCity, shortenCityName} from '../utils/utils';
import {getGender, getProfileJobs} from '../constants/constants';

export const ViewProfile = ({user, isMe}) => {
  const hometown = shortenCityName(getCity(user.homeTown)?.Name);
  return (
    <View style={styles.container}>
      {isMe ? (
        <Text types="h3,bold" style={styles.tcenter}>
          Thông tin cá nhân
        </Text>
      ) : (
        <Text types="bold,h2" style={styles.wrapContent}>
          {user.displayName}
        </Text>
      )}
      <View style={[styles.row, styles.mt]}>
        <Avatar
          source={user.photoURL}
          size="large"
          isShowDetailFullScreen={false}
          type=""
          containerStyle={[styles.border]}
        />
        <View style={[styles.info, styles.ml]}>
          <View>{isMe && <Text types="bold,h2">{user.displayName}</Text>}</View>
          <View style={[styles.row]}>
            <PhoneIcon size={20} />
            <Text types="h2">{' ' + user.phoneNumber}</Text>
          </View>
          <View style={[styles.row]}>
            <BirthdayIcon size={20} />
            <Text types="h2">{' ' + user.birthday}</Text>
          </View>
          {!!user.email && (
            <View style={[styles.row]}>
              <EmailIcon size={20} />
              <Text types="h2">{' ' + user.email}</Text>
            </View>
          )}
          <View style={[styles.row]}>
            <HomeIcon size={20} />
            <Text types="h2">{' ' + hometown}</Text>
          </View>
          <View style={[styles.row]}>
            <GenderIcon size={20} />
            <Text types="h2">{' ' + getGender(user.gender)}</Text>
          </View>
          <View style={[styles.row]}>
            <JobIcon size={20} />
            <Text types="h2">{' ' + getProfileJobs(user.job)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  width: {
    width: 150,
  },
  ml: {
    marginLeft: 6,
  },
  mt: {
    marginTop: 6,
  },
  border: {
    borderRadius: 8,
  },
  tcenter: {
    textAlign: 'center',
  },
  wrapContent: {
    flexWrap: 'wrap',
  },
});
