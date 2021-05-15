import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartItem from '../compoinents/card-item';

import styles from './logistic.style';
import {navigationName} from '../../../constants/navigation';
import {useHooks} from '../hooks';
import {lightTheme} from '../../../config/theme';
import Filter from '../../find-inn/component/filter';
import ActionButton from 'react-native-action-button';
import {translate} from '../../../constants/translate';

const Logistic = ({navigation}) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState(true);
  const {handlers, selectors} = useHooks();
  const {logistics, isLoading, role} = selectors;
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

  const onGotoCreateLogistic = () => {
    navigation.navigate(navigationName.logistic.createLogistic);
  };
  const onGotoMyLogistic = () => {
    navigation.navigate(navigationName.logistic.myLogistic);
  };

  useEffect(() => {
    onFetchInn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFetchInn({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
      reload: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
      />
      {isLoading && (
        <ActivityIndicator style={styles.loading} color={lightTheme.primary} />
      )}
      <Filter
        isShow={isShowFilter}
        callBack={filterCallBack}
        showPricePicker={false}
        // styleContainer={styles.filterModelContainer}
      />
      {role === 'supplier' && (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            title={translate.new}
            onPress={onGotoCreateLogistic}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            title={translate.logistic.myLogistic}
            onPress={onGotoMyLogistic}>
            <Ionicons name="list" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      )}
    </View>
  );
};

export default Logistic;
