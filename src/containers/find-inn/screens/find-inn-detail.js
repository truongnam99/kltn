import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import {ImageView, Text} from '../../../components/index';
import {dial, numeralPrice} from '../../../utils/utils';
import {navigationName} from '../../../constants/navigation';
import {noImage} from '../../../constants/string';
import {activeOpacity} from '../../../components/shared';
import styles from './find-inn-detail.style';

const FindInnDetail = ({route, navigation}) => {
  const {inn} = route.params;

  const onGotoChat = () => {
    if (!inn.created_by) {
      return;
    }
    navigation.navigate(navigationName.home.chat, {
      screen: navigationName.chat.chatDetail,
      params: {
        name: inn.created_by.displayName,
        photoUrl: inn.created_by.photoURL,
        destUser: {
          id: inn.created_by.uid,
          displayName: inn.created_by.displayName,
          photoURL: inn.created_by.photoURL,
        },
      },
    });
  };

  const onViewProfile = () => {
    navigation.navigate(navigationName.findInn.viewProfile, {
      profile: inn.created_by,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {inn.upload_room_images?.length && (
          <View>
            <ImageView images={inn.upload_room_images} />
          </View>
        )}
        <View style={styles.detailContainer}>
          <View style={[styles.primaryContainer, styles.row, styles.alignEnd]}>
            <FastImage
              source={{
                uri: inn.created_by?.photoURL
                  ? inn.created_by.photoURL
                  : noImage,
              }}
              style={styles.avatar}
            />

            <Text style={[styles.fontSize16, styles.fz16, styles.ml6]}>
              {inn.created_by?.displayName}
            </Text>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onViewProfile}>
              <MaterialIcons name="info-outline" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.name}>{inn.room_name}</Text>
            <Text>Địa chỉ: {inn.exact_room_address}</Text>
            <Text>Số điện thoại: {inn.phone_number}</Text>
            <Text>Giá: {numeralPrice(inn.room_price)} đ</Text>
            <Text>Diện tích: {inn.room_area} m2</Text>
            <Text>Điện: {numeralPrice(inn.electric_price)} k/kw</Text>
            <Text>Cộc: {numeralPrice(inn.deposit)} đ</Text>
            <Text>Nước: {numeralPrice(inn.water_price)} k/m3</Text>
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Mô tả</Text>
            <Text>{inn.notes}</Text>
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Tiện ích</Text>
            {inn.air_conditioner && <Text>- Máy lạnh</Text>}
            {inn.room_bathroom && <Text>- Phòng tắm</Text>}
            {inn.parking_situation && <Text>- Chỗ đổ xe</Text>}
            {inn.room_wifi && <Text>- Wifi</Text>}
            {inn.room_refrigerator && <Text>- Tủ lạnh</Text>}
            {inn.room_washing_machine && <Text>- Máy rửa chén</Text>}
            {inn.security_guard && <Text>- Bảo vệ</Text>}
            {inn.room_bed && <Text>- Phòng ngủ</Text>}
            {inn.room_tivi && <Text>- Tivi</Text>}
            {inn.room_pets_allowed && <Text>- Cho phép nuôi thú cưng</Text>}
            {inn.room_closet && <Text>- Rèm cửa</Text>}
            {inn.room_kitchen && <Text>- Nhà bếp</Text>}
            {inn.window && <Text>- Cửa số</Text>}
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Chú ý</Text>
            {inn.attention && <Text>{inn.attention}</Text>}
          </View>
          <View style={styles.primaryContainer}>
            <Text
              style={StyleSheet.flatten([{marginBottom: 6}])}
              types="bold,h2">
              Liên hệ
            </Text>
            <View style={styles.rowLayout}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={onGotoChat}>
                <MaterialIcons
                  name="chat"
                  size={32}
                  color="#0E8DF1"
                  style={styles.me16}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={() => dial(inn.phone_number)}>
                <MaterialIcons
                  name="call"
                  size={32}
                  color="#0E8DF1"
                  style={styles.me16}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FindInnDetail;
