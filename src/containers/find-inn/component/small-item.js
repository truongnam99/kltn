import React, {useRef} from 'react';
import {View} from 'react-native';

import {Image, Text} from '../../../components';
import {numeralPrice} from '../../../utils/utils';
import styles from './small-item.style';

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
        <Image image={images && images[0]} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textName} numberOfLines={2}>
          {room_name}
        </Text>
        <Text numberOfLines={2}>{exact_room_address}</Text>
        <View>
          <Text>{'$ ' + numeralPrice(room_price)}đ</Text>
        </View>
      </View>
    </View>
  );
};

export default SmallItem;
