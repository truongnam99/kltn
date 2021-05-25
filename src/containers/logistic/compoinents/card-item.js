import React from 'react';
import {View} from 'react-native';
import styles from './card-item.style';
import {Image, Text} from '../../../components';

const CartItem = ({image, owner, price, ownerName}) => {
  return (
    <View style={styles.container}>
      <Image image={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image image={owner.photoURL} style={styles.userAvatar} />
          <Text style={styles.username}>
            {ownerName || owner.displayName || owner.username}
          </Text>
        </View>
        <Text style={styles.price} numberOfLines={2}>
          Giá: {price}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
