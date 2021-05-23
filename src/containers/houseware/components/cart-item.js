import dayjs from 'dayjs';
import React, {memo, useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {getCity, shortenCityName} from '../../../utils/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Contact} from '../../roommate/components/contact';
import {styles} from './cart-item.style';

const Owner = ({image, name, belowOwner}) => {
  return (
    <View style={styles.row}>
      <FastImage source={{uri: image}} style={styles.avatar} />
      <View style={styles.ownerView}>
        <Text style={styles.name}>{name}</Text>
        {belowOwner()}
      </View>
    </View>
  );
};

const Item = ({image, price, discription, itemContainer}) => {
  return (
    <View style={[styles.row, itemContainer]}>
      <View style={styles.imageView}>
        <FastImage source={{uri: image}} style={styles.photo} />
      </View>
      <View style={styles.itemDesciption}>
        <Text>{`Giá: ${price}`}</Text>
        <Text>{`Mô tả: ${discription}`}</Text>
      </View>
    </View>
  );
};

const PopupAction = ({onMarkSold, isActive}) => {
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcons name="dots-horizontal" size={24} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          text={isActive ? 'Đánh dấu đã bán' : 'Đánh dấu chưa bán'}
          onSelect={onMarkSold}
        />
      </MenuOptions>
    </Menu>
  );
};

const CartItem = ({
  id,
  owner,
  content,
  navigation,
  items,
  containerStyle,
  location,
  createdAt,
  isActive,
  showContact = true,
  isMe = false,
  onMarkSold,
}) => {
  const [numberOfDisplays, setNumberOfDisplays] = useState(1);
  const city = shortenCityName(getCity(location)?.Name);

  const BottomItem = useCallback(() => {
    if (items?.length <= 1) {
      return;
    }
    return (
      <View style={styles.bottomItemContainer}>
        <TouchableOpacity
          onPress={() => {
            if (items.length > 1) {
              if (numberOfDisplays === 1) {
                setNumberOfDisplays(items.length);
              } else {
                setNumberOfDisplays(1);
              }
            }
          }}>
          <Text style={styles.textBottomColor}>
            {numberOfDisplays > 1 ? 'Thu gọn' : 'Xem thêm'}
          </Text>
        </TouchableOpacity>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfDisplays]);

  const _renderAction = useCallback(() => {
    if (isMe) {
      return <PopupAction onMarkSold={() => onMarkSold(id, !isActive)} />;
    }
    return (
      showContact && owner && <Contact owner={owner} navigation={navigation} />
    );
  }, [showContact, isMe, owner, navigation, onMarkSold, id, isActive]);

  const _renderBelowOwner = useCallback(() => {
    const time = createdAt
      ? dayjs(createdAt?.toDate()).format('DD/MM/YYYY')
      : '';
    if (isMe) {
      return <Text>{isActive ? 'Đang bán' : 'Đã bán'}</Text>;
    } else {
      return (
        <Text style={styles.time}>
          {time}
          <Text style={styles.dot}> · </Text>
          {city}
        </Text>
      );
    }
  }, [isActive, city, isMe, createdAt]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, styles.headerContainer]}>
        {owner && (
          <Owner
            image={owner.photoURL}
            name={owner.displayName}
            belowOwner={_renderBelowOwner}
          />
        )}
        {_renderAction()}
      </View>
      <Text>{content}</Text>
      {numberOfDisplays !== 1 ? (
        items?.map((item, index) => (
          <Item
            key={index}
            image={item.image}
            price={item.price}
            discription={item.description}
            itemContainer={styles.itemContainer}
          />
        ))
      ) : items.length ? (
        <Item
          image={items[0].image}
          price={items[0].price}
          discription={items[0].description}
          itemContainer={styles.itemContainer}
        />
      ) : null}
      {BottomItem()}
    </View>
  );
};

export default memo(CartItem);
