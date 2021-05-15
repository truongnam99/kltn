import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ImageView} from '../../../components/index';
import styles from './find-inn-detail.style';
import {dial, numeralPrice} from '../../../utils/utils';
import {navigationName} from '../../../constants/navigation';
import FastImage from 'react-native-fast-image';
import {noImage} from '../../../constants/string';

const FindInnDetail = ({route, navigation}) => {
  const {inn} = route.params;
  const {
    room_name,
    room_price,
    room_area,
    electric_price,
    water_price,
    exact_room_address,
    phone_number,
    notes,
    upload_room_images,
    air_conditioner,
    room_bathroom,
    parking_situation,
    room_wifi,
    curfew_situation,
    room_refrigerator,
    room_washing_machine,
    security_guard,
    room_bed,
    room_tivi,
    room_pets_allowed,
    room_closet,
    room_kitchen,
    window,
    created_by,
  } = inn;

  const onGotoChat = () => {
    if (!created_by) {
      return;
    }
    navigation.navigate(navigationName.home.chat, {
      screen: navigationName.chat.chatDetail,
      params: {
        name: created_by.displayName,
        photoUrl: created_by.photoURL,
        destUser: {
          id: created_by.uid,
          displayName: created_by.displayName,
          photoURL: created_by.photoURL,
        },
      },
    });
  };

  const onViewProfile = () => {
    navigation.navigate(navigationName.findInn.viewProfile, {
      profile: created_by,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {upload_room_images?.length && (
          <View>
            <ImageView images={upload_room_images} />
          </View>
        )}
        <View style={styles.detailContainer}>
          <View style={[styles.primaryContainer, styles.row, styles.alignEnd]}>
            <FastImage
              source={{
                uri: created_by?.photoURL ? created_by.photoURL : noImage,
              }}
              style={styles.avatar}
            />
            <Text style={[styles.fontSize16, styles.fz16, styles.ml6]}>
              {created_by?.displayName}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onViewProfile}>
              <MaterialIcons name="info-outline" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.name}>{room_name}</Text>
            <Text>{exact_room_address}</Text>
            <Text>Số điện thoại: {phone_number}</Text>
            <Text>Giá: {numeralPrice(room_price)}đ</Text>
            <Text>Diện tích phòng: {room_area}m2</Text>
            <Text>Điện: {numeralPrice(electric_price)}k/kw</Text>
            <Text>Cộc: {}đ</Text>
            <Text>Nước: {numeralPrice(water_price)}k/người</Text>
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.fontSize16}>Mô tả</Text>
            <Text>{notes}</Text>
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.fontSize16}>Tiện ích</Text>
            {air_conditioner && <Text>- Máy lạnh</Text>}
            {room_bathroom && <Text>- Phòng tắm</Text>}
            {parking_situation && <Text>- Chỗ đổ xe</Text>}
            {room_wifi && <Text>- Wifi</Text>}
            {room_refrigerator && <Text>- Tủ lạnh</Text>}
            {room_washing_machine && <Text>- Máy rửa chén</Text>}
            {security_guard && <Text>- Bảo vệ</Text>}
            {room_bed && <Text>- Phòng ngủ</Text>}
            {room_tivi && <Text>- Tivi</Text>}
            {room_pets_allowed && <Text>- Cho phép nuôi thú cưng</Text>}
            {room_closet && <Text>- Rèm cửa</Text>}
            {room_kitchen && <Text>- Nhà bếp</Text>}
            {window && <Text>- Cửa số</Text>}
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.fontSize16}>Chú ý</Text>
            {curfew_situation && <Text>Giờ giới nghiêm</Text>}
          </View>
          <View style={styles.primaryContainer}>
            <Text
              style={StyleSheet.flatten([
                styles.fontSize16,
                {marginBottom: 6},
              ])}>
              Liên hệ
            </Text>
            <View style={styles.rowLayout}>
              <TouchableOpacity activeOpacity={0.8} onPress={onGotoChat}>
                <MaterialIcons
                  name="chat"
                  size={32}
                  color="#0E8DF1"
                  style={styles.me16}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => dial(phone_number)}>
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
