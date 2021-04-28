import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {lightTheme} from '../../../config/theme';

import Header from '../component/header';
import LargeItem from '../component/large-item';
import SmallItem from '../component/small-item';
import useHooks from '../hooks';
import styles from './find-inn.style';

// import {inns} from '../../../mookData/inns';
import Filter from '../component/filter';
import {numeralPrice} from '../../../utils/utils';

const FindInn = ({navigation}) => {
  const [typeOfItem, setTypeOfItem] = useState('large');
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [filter, setFilter] = useState({});
  const {handlers, selectors} = useHooks();
  const {isLoading, inns} = selectors;
  const {handleFetchInn} = handlers;

  const onChangeView = () => {
    if (typeOfItem === 'small') {
      setTypeOfItem('large');
    } else {
      setTypeOfItem('small');
    }
  };

  const onFetchInn = (props = {}) => {
    handleFetchInn({
      district: filter.district,
      minPrice: filter.price?.minPrice,
      maxPrice: filter.price?.maxPrice,
      reload: props.reload,
    });
  };

  useEffect(() => {
    // onFetchInn();
  }, []);

  const onViewDetail = inn => {
    navigation.push('FindInnDetailFindInnDetail', {
      inn,
    });
  };

  const onHeaderChangeText = value => {
    setHeaderText(value);
  };

  const onOpenFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  const filterCallBack = value => {
    setIsShowFilter(false);
    setFilter(value);
  };

  const showFilter = () => {
    let value = '';
    if (filter && filter.price) {
      value += `${numeralPrice(filter.price.minPrice)}-${numeralPrice(
        filter.price.maxPrice,
      )}`;
    }
    if (filter.district) {
      if (value) {
        value += '. ';
      }
      value += filter.district;
    }
    return value;
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => onFetchInn({reload: true})}
        onChangeText={onHeaderChangeText}
        value={headerText}
      />
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <Text style={styles.filter} numberOfLines={1}>
            {showFilter()}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onOpenFilter} activeOpacity={0.7}>
              <MaterialIcons
                name="filter-alt"
                size={24}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.changeViewContainer}>
            <TouchableOpacity
              onPress={() => {
                onChangeView();
              }}
              activeOpacity={0.7}>
              <MaterialIcons
                name="filter-none"
                size={24}
                style={styles.changeView}
              />
            </TouchableOpacity>
          </View>
        </View>
        {typeOfItem === 'large' ? (
          <FlatList
            style={styles.flex1}
            key={1}
            numColumns={1}
            data={inns}
            keyExtractor={(item, index) => index}
            onEndReached={onFetchInn}
            onEndReachedThreshold={0}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => onViewDetail(item.item)}
                activeOpacity={0.9}>
                <LargeItem
                  images={item.item.upload_room_images}
                  room_name={item.item.room_name}
                  room_price={item.item.room_price}
                  electric_price={item.item.electric_price}
                  water_price={item.item.water_price}
                  exact_room_address={item.item.exact_room_address}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            key={2}
            style={styles.flex1}
            numColumns={2}
            data={inns}
            keyExtractor={(item, index) => index}
            columnWrapperStyle={styles.row}
            onEndReached={onFetchInn}
            onEndReachedThreshold={0}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => onViewDetail(item.item)}
                style={styles.smallItemContainer}>
                <SmallItem
                  images={item.item.upload_room_images}
                  room_name={item.item.room_name}
                  room_price={item.item.room_price}
                  electric_price={item.item.electric_price}
                  water_price={item.item.water_price}
                  exact_room_address={item.item.exact_room_address}
                />
              </TouchableOpacity>
            )}
          />
        )}
        {isLoading && (
          <ActivityIndicator
            style={styles.loading}
            color={lightTheme.primary}
          />
        )}
      </View>
      <Filter isShow={isShowFilter} callBack={filterCallBack} />
    </View>
  );
};

export default FindInn;
