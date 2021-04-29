import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './card-item.style';

const CartItem = ({image, owner, price}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri: owner.photoURL}} style={styles.userAvatar} />
          <Text style={styles.username}>{owner.username}</Text>
        </View>
        <Text style={styles.price} numberOfLines={2}>
          Giá: {price}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
