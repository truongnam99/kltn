import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ImageView} from '../../../components/index';
import styles from './find-inn-detail.style';

const FindInnDetail = ({
  user_id = '5c398df481bd203a0603a264',
  admin_id = null,
  room_name = 'Phòng cho thuê Nguyễn văn trỗi, Quận Phú Nhuận.Full nội thất',
  room_price = 5500000,
  room_area = 28,
  deposit = 1,
  electric_price = 3800,
  water_price = 100000,
  parking_fee = 0,
  wifi_cost = null,
  room_location = 'HCM',
  room_location_district = 768,
  exact_room_address = '145 Nguyễn văn trỗi, Phường 11, Quận Phú Nhuận, Hồ Chí Minh',
  full_address_object = {
    city: {code: 'HCM', text: 'Hồ Chí Minh'},
    district: {code: 768, text: 'Quận Phú Nhuận', cityCode: 'HCM'},
    ward: {districtCode: 768, code: 27073, text: 'Phường 11'},
    streetName: 'Nguyễn văn trỗi',
    houseNumber: '145',
  },
  phone_number = '0938938757',
  room_is_shared = false,
  number_room = '1',
  number_vacancies_available_in_room = '2',
  room_gender = 'any',
  notes = 'Cho Thuê Phòng Đường Nguyễn Văn Trỗi. Sát Q1. Gần Sân khấu kịch Phú Nhuận, sân bay Tân Sơn Nhất. Khu vực an ninh, dân trí cao.\n- Diện tích phòng 28m2\n- Phòng Toilet riêng, bếp riêng, Tủ quần áo, Máy lạnh, Tủ Lạnh, Giường nệm, Ban công, Cửa sổ, Máy Nước Nóng lạnh. Sân nội bộ yên tĩnh và an ninh\n- Trang bị Camera an ninh 24/24. Wifi tốc độ cao. Khóa Từ Vân Tay \n- Giờ giấc tự do. Không chung chủ. Chỗ để xe rộng rãi. (Free Wifi. Máy Giặc. Chỗ để xe)\nGiá 5tr5 tháng\nLh xem phòng Call = 0938938757',
  upload_room_images = [
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195501.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947968_IMG_20191114_195557.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195503.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195459.jpg',
  ],
  created_date = 1573883991132,
  updated_date = 1573883991132,
  air_conditioner = true,
  room_bathroom = true,
  parking_situation = true,
  room_wifi = true,
  curfew_situation = true,
  share_home_as_landlord = true,
  room_refrigerator = true,
  room_washing_machine = true,
  security_guard = true,
  room_bed = true,
  room_tivi = true,
  room_pets_allowed = false,
  room_closet = true,
  room_kitchen = true,
  window = true,
  water_heater = true,
  loft = false,
  is_top_room = false,
  room_type = 'NotShared',
  opened_hour = {},
  closed_hour = {},
  pending = 'Enabled',
  disabled = false,
  room_view = 60,
  geocodingApi = {
    bounds: {
      northeast: {lat: 10.7947492, lng: 106.6767839},
      southwest: {lat: 10.7945924, lng: 106.6766273},
    },
    location: {lat: 10.794677, lng: 106.6766836},
    location_type: 'ROOFTOP',
    viewport: {
      northeast: {lat: 10.7960197802915, lng: 106.6780545802915},
      southwest: {lat: 10.7933218197085, lng: 106.6753566197085},
    },
  },
  geoJSON = {
    type: 'Point',
    coordinates: [106.6766836, 10.794677],
  },
  available_status = {value: 1, label: 'Available'},
  available_status_date = '2019-11-16T05:59:51.132Z',
  processPending = [{status: 'Enabled', date: '2019-11-16T17:05:12.895Z'}],
}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name="keyboard-return"
              style={styles.icon}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chi tiết trọ</Text>
        </View>
      </View> */}

      <ScrollView>
        <View>
          <ImageView images={upload_room_images} />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.primaryContainer}>
            <Text style={styles.name}>{room_name}</Text>
            <Text>{exact_room_address}</Text>
            <Text>Giá: {room_price}đ</Text>
            <Text>Diện tích phòng: {room_area}m2</Text>
            <Text>Điện: {electric_price}k/kw</Text>
            <Text>Cộc: {}đ</Text>
            <Text>Nước: {water_price}k/người</Text>
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
              <MaterialIcons
                name="chat"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
              <AntDesign
                name="facebook-square"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
              <MaterialIcons
                name="call"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FindInnDetail;
