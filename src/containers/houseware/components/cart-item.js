import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Contact} from '../../roommate/components/contact';
import {styles} from './cart-item.style';

const Owner = ({image, name, time, location}) => {
  return (
    <View style={styles.row}>
      <FastImage source={{uri: image}} style={styles.avatar} />
      <View style={styles.ownerView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>
          {time}
          <Text style={styles.dot}> · </Text>
          {location}
        </Text>
      </View>
    </View>
  );
};

const Item = ({image, price, discription, itemContainer}) => {
  return (
    <View style={[styles.row, itemContainer]}>
      <FastImage source={{uri: image}} style={styles.photo} />
      <View style={styles.itemDesciption}>
        {price && <Text>Giá: {price}</Text>}
        {discription && <Text>Mô tả: {discription}</Text>}
      </View>
    </View>
  );
};

export const CartItem = ({
  owner,
  content,
  navigation,
  items,
  containerStyle,
  location,
  createdAt,
  showContact = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, styles.headerContainer]}>
        {owner && (
          <Owner
            image={owner.photoURL}
            name={owner.displayName}
            location={location}
            time={createdAt}
          />
        )}
        {showContact && owner && (
          <Contact owner={owner} navigation={navigation} />
        )}
      </View>
      <Text>{content}</Text>
      {items?.map(item => (
        <Item
          image={item.image}
          price={item.price}
          discription={item.description}
          itemContainer={styles.itemContainer}
        />
      ))}
    </View>
  );
};
