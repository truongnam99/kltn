import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {numeralPrice} from '../../../utils/utils';
import {Image, Text} from '../../../components';
import styles from './large-item.style';
import {ElectrictIcon, WaterIcon} from '../../../components/icon';

const LargeItem = ({
  images,
  room_name,
  room_price = 0,
  electric_price = 0,
  water_price = 0,
  exact_room_address,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image image={images && images[0]} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{room_name || ''}</Text>
        <Text>
          <Ionicons name="location-outline" size={16} />
          {' ' + exact_room_address || ''}
        </Text>
        <View style={styles.row}>
          <Text>{'$ ' + numeralPrice(room_price)}đ</Text>
          <Text>
            <ElectrictIcon size={16} /> {numeralPrice(electric_price)}đ
          </Text>
          <Text>
            <WaterIcon size={16} /> {numeralPrice(water_price)}đ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LargeItem;
