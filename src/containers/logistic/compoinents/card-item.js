import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './card-item.style';

const CartItem = ({image, userName, price, userAvatar}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri: userAvatar}} style={styles.userAvatar} />
          <Text style={styles.username}>{userName}</Text>
        </View>
        <Text style={styles.price}>Giá: {price}</Text>
      </View>
    </View>
  );
};

export default CartItem;
