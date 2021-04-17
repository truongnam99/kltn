import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../find-inn/component/header';
import CartItem from '../components/cart-item';
import styles from './roommate.style';
const data = [
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content:
      'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content:
      'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content:
      'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content: 'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn V',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content: 'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường L',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content:
      'Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn Việt, Thủ Đức, Chào các bạn, mình đang cần tìm một bạn ở ghép ở đường Lê Văn ',
    name: 'Truong Hoang Nam',
  },
  {
    avatar:
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
    content: 'Chào các bạn, mình đang cần tì',
    name: 'Truong Hoang Nam',
  },
];

const Roommate = ({...props}) => {
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
      <View style={styles.itemContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            <View style={styles.itemStyle}>
              <CartItem {...item.item} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Roommate;
