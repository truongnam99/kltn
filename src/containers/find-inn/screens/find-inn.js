import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {navigationName} from '../../../constants/navigation';

import Header from '../component/header';
import LargeItem from '../component/large-item';
import SmallItem from '../component/small-item';
import useHooks from '../hooks';
import styles from './find-inn.style';

import Filter from '../component/filter';
import {numeralPrice} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import {FooterListComponent} from '../../../components';

const FindInn = ({navigation}) => {
  const [typeOfItem, setTypeOfItem] = useState('large');
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [filter, setFilter] = useState({});
  const {handlers, selectors} = useHooks();
  const {isLoading, inns, role} = selectors;
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
      searchText: headerText,
      district: filter.district?.Id,
      city: filter.city?.Id,
      minPrice: filter.price?.minPrice,
      maxPrice: filter.price?.maxPrice,
      ...props,
    });
  };

  useEffect(() => {
    onFetchInn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewDetail = inn => {
    navigation.navigate(navigationName.findInn.innDetail, {
      inn,
    });
  };

  const onGotoCreateInn = () => {
    navigation.navigate(navigationName.findInn.createInn);
  };

  const onGotoMyInn = () => {
    navigation.navigate(navigationName.findInn.myInn);
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

  useEffect(() => {
    onFetchInn({reload: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const showFilter = () => {
    let value = '';
    if (filter && filter.price) {
      const min = numeralPrice(filter.price.minPrice);
      const max = numeralPrice(filter.price.maxPrice);
      if (filter.price.minPrice && filter.price.maxPrice) {
        value += `${min}-${max}`;
      } else if (filter.price.minPrice) {
        value += `> ${min}`;
      } else if (filter.price.maxPrice) {
        value += `< ${max}`;
      }
    }
    if (filter.city) {
      if (value) {
        value += '. ';
      }
      value += filter.city.Name;
    }
    if (filter.district) {
      if (value) {
        value += '. ';
      }
      value += filter.district.Name;
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
            ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
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
            ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
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
            ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
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
            ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
          />
        )}
      </View>
      <Filter isShow={isShowFilter} callBack={filterCallBack} />
      {role === 1 && (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item title={translate.new} onPress={onGotoCreateInn}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item title={translate.inn.myInn} onPress={onGotoMyInn}>
            <Ionicons name="list" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      )}
    </View>
  );
};

export default FindInn;
