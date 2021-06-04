import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import MapViewDirections from 'react-native-maps-directions';
import {Button, Marker} from '../../components';
import MapView from 'react-native-maps';
import {
  ActionButton,
  ActionButtonItem,
} from '../../components/action-button/action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';

const ItemChildren = () => {
  return <Text>aaaaaaaaaa</Text>;
};

const ItemContainer = ({children}) => {
  return (
    <View>
      <Text>container</Text>
      {children}
    </View>
  );
};

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const HORIZONTAL_MARGIN = 20;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;

const inn = {
  _id: '5dcf90572e7fd677b62bf4d4',
  user_id: '5c398df481bd203a0603a264',
  admin_id: null,
  room_name: 'Phòng cho thuê Nguyễn văn trỗi, Quận Phú Nhuận.Full nội thất',
  room_price: 5500000,
  room_area: 28,
  deposit: 1,
  electric_price: 3800,
  water_price: 100000,
  parking_fee: 0,
  wifi_cost: null,
  room_location: 'HCM',
  room_location_district: 768,
  exact_room_address:
    '145 Nguyễn văn trỗi, Phường 11, Quận Phú Nhuận, Hồ Chí Minh',
  full_address_object: {
    city: {code: 'HCM', text: 'Hồ Chí Minh'},
    district: {
      code: 768,
      text: 'Quận Phú Nhuận',
      cityCode: 'HCM',
    },
    ward: {districtCode: 768, code: 27073, text: 'Phường 11'},
    streetName: 'Nguyễn văn trỗi',
    houseNumber: '145',
  },
  phone_number: '0938938757',
  room_is_shared: false,
  number_room: '1',
  number_vacancies_available_in_room: '2',
  room_gender: 'any',
  notes:
    'Cho Thuê Phòng Đường Nguyễn Văn Trỗi. Sát Q1. Gần Sân khấu kịch Phú Nhuận, sân bay Tân Sơn Nhất. Khu vực an ninh, dân trí cao.\n- Diện tích phòng 28m2\n- Phòng Toilet riêng, bếp riêng, Tủ quần áo, Máy lạnh, Tủ Lạnh, Giường nệm, Ban công, Cửa sổ, Máy Nước Nóng lạnh. Sân nội bộ yên tĩnh và an ninh\n- Trang bị Camera an ninh 24/24. Wifi tốc độ cao. Khóa Từ Vân Tay \n- Giờ giấc tự do. Không chung chủ. Chỗ để xe rộng rãi. (Free Wifi. Máy Giặc. Chỗ để xe)\nGiá 5tr5 tháng\nLh xem phòng Call : 0938938757',
  upload_room_images: [
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195501.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947968_IMG_20191114_195557.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195503.jpg',
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195459.jpg',
    ,
  ],
  created_date: 1573883991132,
  updated_date: 1573883991132,
  air_conditioner: true,
  room_bathroom: true,
  parking_situation: true,
  room_wifi: true,
  curfew_situation: true,
  share_home_as_landlord: true,
  room_refrigerator: true,
  room_washing_machine: true,
  security_guard: true,
  room_bed: true,
  room_tivi: true,
  room_pets_allowed: false,
  room_closet: true,
  room_kitchen: true,
  window: true,
  water_heater: true,
  geocodingApi: {
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
  geoJSON: {type: 'Point', coordinates: [106.6766836, 10.794677]},
};

export default function Test() {
  const onPress = useCallback(props => {
    console.log('dddd', props);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 10.821473,
          longitude: 106.62865,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.flex1}>
        <Marker
          coordinate={{
            latitude: 10.881473,
            longitude: 106.62865,
          }}
          onPress={onPress}
          title="Nhà trọ Abc efafwe"
          description="Giá: 200k"
          inn={inn}
        />
        <Marker
          coordinate={{
            latitude: 10.821473,
            longitude: 106.62865,
          }}
          onPress={onPress}
          inn={inn}
          title="Nhà trọ Abc"
        />
      </MapView>
      <View style={styles.itemContainer}>
        <Text>fdsafd</Text>
        <Text>fdsafd</Text>
        <Text>fdsafd</Text>
        <Text>fdsafd</Text>
        <Text>fdsafd</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4d4d4',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  flex1: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
    height: ITEM_PREVIEW_HEIGHT,
    marginHorizontal: HORIZONTAL_MARGIN,
    width: screen.width - 2 * HORIZONTAL_MARGIN,
    top: screen.height - ITEM_PREVIEW_HEIGHT,
    borderRadius: 8,
    padding: 8,
  },
});
