import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './large-item.style';
import {ImageView} from '../../../components';
import {numeralPrice} from '../../../utils/utils';

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
        {/* <ImageView images={images} /> */}
        <Image
          source={{
            uri: images[0],
            //'https://firebasestorage.googleapis.com/v0/b/kltn-d14a6.appspot.com/o/images%2Fccrdvvnk.jpg?alt=media',
          }}
          style={styles.image}
        />
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
