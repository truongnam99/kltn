import React from 'react';
import {Image, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './logistic-detail.style';
import {translate} from '../../../constants/translate';
const data = {
  image:
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  username: 'Truong Hoang Nam',
  userAvatar:
    'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
  area: 'Thủ Đức, Quận 9',
  price: '< 10km giá 25k/km\n> 10km giá thương lượng',
  notes:
    'Cung cấp dịch vụ vận chuyển giá rẻ ở các khu vực Thủ Đức, Quận 9.\nLiên hệ để đặt chỗ và biết giá cả chi tiết.',
};

const LogisticDetail = ({...props}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri: data.userAvatar}} style={styles.userImage} />
          <Text style={styles.username}>{data.username}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.area}</Text>
          <Text>{data.area}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.price}</Text>
          <Text>{data.price}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.detail}</Text>
          <Text>{data.notes}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.contact}</Text>
          <View style={styles.rowLayout}>
            <MaterialIcons
              name="chat"
              size={32}
              color="#0E8DF1"
              style={styles.me16}
            />
            <AntDesign
              name="facebook-square"
              size={32}
              color="#0E8DF1"
              style={styles.me16}
            />
            <MaterialIcons
              name="call"
              size={32}
              color="#0E8DF1"
              style={styles.me16}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LogisticDetail;
