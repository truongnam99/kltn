import dayjs from 'dayjs';
import React, {memo, useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {getDistricts, shortenDistrictName} from '../../../utils/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Contact} from './contact';
import {styles} from './cart-item.style';
import {Image, Text} from '../../../components';
import {navigationName} from '../../../constants/navigation';

const Owner = ({image, name, belowOwner}) => {
  return (
    <View style={styles.row}>
      <Image image={image} style={styles.avatar} isAvata={true} />
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
        <Image image={image} style={styles.photo} />
      </View>
      <View style={styles.itemDesciption}>
        <Text>
          <Text types="bold">Giá: </Text>
          {price}
        </Text>
        <Text style={styles.description}>
          <Text types="bold">Mô tả: </Text>
          {discription}
        </Text>
      </View>
    </View>
  );
};

const PopupAction = ({onMarkSold, isActive, onUpdate, item}) => {
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
        <MenuOption text="Chỉnh sửa" onSelect={() => onUpdate(item)} />
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
  city,
  district,
  createdAt,
  isActive,
  showContact = true,
  isMe = false,
  onMarkSold,
  onUpdate,
  item,
}) => {
  const [numberOfDisplays, setNumberOfDisplays] = useState(1);
  const cityName = shortenDistrictName(
    getDistricts(city)?.find(item => item.value === district)?.label,
  );

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

  const onGotoProfile = () => {
    navigation.navigate(navigationName.houseware.profile, {
      profile: owner,
    });
  };

  const _renderAction = useCallback(() => {
    if (isMe) {
      return (
        <PopupAction
          onMarkSold={() => onMarkSold(id, !isActive)}
          isActive={isActive}
          onUpdate={onUpdate}
          item={item}
        />
      );
    }
    return (
      showContact && owner && <Contact owner={owner} navigation={navigation} />
    );
  }, [
    showContact,
    isMe,
    owner,
    navigation,
    onMarkSold,
    id,
    isActive,
    item,
    onUpdate,
  ]);

  const _renderBelowOwner = useCallback(() => {
    const time = createdAt
      ? dayjs(createdAt?.toDate()).format('DD/MM/YYYY')
      : '';
    if (isMe) {
      return (
        <Text style={styles.time}>{isActive ? 'Đang bán' : 'Đã bán'}</Text>
      );
    } else {
      return (
        <Text style={styles.time}>
          {time}
          <Text style={styles.dot}> · </Text>
          {cityName}
        </Text>
      );
    }
  }, [isActive, cityName, isMe, createdAt]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, styles.headerContainer]}>
        {owner && (
          <TouchableOpacity activeOpacity={0.8} onPress={onGotoProfile}>
            <Owner
              image={owner.photoURL}
              name={owner.displayName}
              belowOwner={_renderBelowOwner}
            />
          </TouchableOpacity>
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
