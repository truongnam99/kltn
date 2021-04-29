import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartItem from '../compoinents/card-item';
import Header from '../../find-inn/component/header';

import styles from './logistic.style';
import {navigationName} from '../../../constants/navigation';
import {useHooks} from '../hooks';
import {lightTheme} from '../../../config/theme';
import Filter from '../../find-inn/component/filter';

const Logistic = ({navigation}) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState(true);
  const {handlers, selectors} = useHooks();
  const {logistics, isLoading} = selectors;
  const {handlerFetchLogistic} = handlers;

  const onDetailClick = logistic => {
    navigation.navigate(navigationName.logistic.logisticDetail, {logistic});
  };

  const onFetchInn = (props = {}) => {
    handlerFetchLogistic(props);
  };

  const filterCallBack = value => {
    setIsShowFilter(false);
    setFilter(value);
  };

  const onFilterButtonPress = () => {
    setIsShowFilter(!isShowFilter);
  };

  const showFilter = () => {
    let value = '';
    if (filter?.city?.Name) {
      if (value) {
        value += '. ';
      }
      value += filter.city.Name;
    }
    if (filter?.district?.Name) {
      if (value) {
        value += '. ';
      }
      value += filter.district.Name;
    }
    return value;
  };

  useEffect(() => {
    onFetchInn();
  }, []);

  useEffect(() => {
    onFetchInn({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
      reload: true,
    });
  }, [filter]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <Text style={styles.filter}>{showFilter()}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onFilterButtonPress} activeOpacity={0.7}>
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
        data={logistics}
        numColumns={2}
        keyExtractor={(item, index) => index}
        onEndReached={onFetchInn}
        onEndReachedThreshold={0}
        renderItem={item => (
          <TouchableOpacity
            style={styles.cartItem}
            activeOpacity={0.9}
            onPress={() => onDetailClick(item.item)}>
            <CartItem {...item.item} />
          </TouchableOpacity>
        )}
      />
      {isLoading && (
        <ActivityIndicator style={styles.loading} color={lightTheme.primary} />
      )}
      <Filter
        isShow={isShowFilter}
        callBack={filterCallBack}
        showPricePicker={false}
        styleContainer={styles.filterModelContainer}
      />
    </View>
  );
};

export default Logistic;
