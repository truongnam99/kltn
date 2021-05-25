import React from 'react';
import {View} from 'react-native';
import styles from './large-item.style';
import {numeralPrice} from '../../../utils/utils';
import {Image, Text} from '../../../components';

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
        <Text>{exact_room_address || ''}</Text>
        <View>
          <Text>Giá: {numeralPrice(room_price)}đ</Text>
          <Text>Điện: {numeralPrice(electric_price)}đ</Text>
          <Text>Nước: {numeralPrice(water_price)}đ</Text>
        </View>
      </View>
    </View>
  );
};

export default LargeItem;
