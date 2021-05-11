import React from 'react';
import {View, Text} from 'react-native';
import styles from './large-item.style';
import {numeralPrice} from '../../../utils/utils';
import FastImage from 'react-native-fast-image';

const LargeItem = ({
  images,
  room_name,
  room_price,
  electric_price,
  water_price,
  exact_room_address,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images?.length && (
          <FastImage
            source={{
              uri: images[0],
            }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{room_name}</Text>
        <Text>{exact_room_address}</Text>
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
