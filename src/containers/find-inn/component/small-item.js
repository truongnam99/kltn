import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import styles from './small-item.style';
import {ImageView} from '../../../components';

const SmallItem = ({
  images,
  room_name,
  room_price,
  electric_price,
  water_price,
  exact_room_address,
}) => {
  const stageCanvasRef = useRef(null);

  return (
    <View style={styles.container} ref={stageCanvasRef}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: images[0],
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{room_name}</Text>
        <Text>{exact_room_address}</Text>
        <View>
          <Text>Giá: {room_price}đ</Text>
        </View>
      </View>
    </View>
  );
};

export default SmallItem;
