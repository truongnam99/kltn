import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './card-item.style';
import {noImage} from '../../../constants/string';

const CartItem = ({image, owner, price, ownerName}) => {
  return (
    <View style={styles.container}>
      <FastImage source={{uri: image || noImage}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <FastImage
            source={{uri: owner.photoURL || noImage}}
            style={styles.userAvatar}
          />
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
