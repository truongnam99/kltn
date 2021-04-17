import React from 'react';
import {FlatList, TouchableOpacity, View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartItem from '../compoinents/card-item';
import Header from '../../find-inn/component/header';

import styles from './logistic.style';
import {navigationName} from '../../../constants/navigation';

const data = [
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Namdfjslafsdlfasdfsfd',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Nam',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
  {
    image:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    userName: 'Truong Hoang Namdfjslafsdlfasdfsfd',
    price: 300000,
    userAvatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  },
];

const Logistic = ({navigation}) => {
  const onDetailClick = () => {
    navigation.navigate(navigationName.logistic.logisticDetail);
  };

  return (
    <View style={styles.container}>
      <Header onPress={() => {}} />
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <Text style={styles.filter}></Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              <MaterialIcons
                name="filter-alt"
                size={24}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <TouchableOpacity
            style={styles.cartItem}
            activeOpacity={0.9}
            onPress={() => onDetailClick()}>
            <CartItem {...item.item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Logistic;
