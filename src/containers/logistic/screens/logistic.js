import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';

import {useHooks} from '../hooks';
import CartItem from '../compoinents/card-item';
import Filter from '../../find-inn/component/filter';
import styles from './logistic.style';
import {navigationName} from '../../../constants/navigation';
import {lightTheme} from '../../../config/theme';
import {translate} from '../../../constants/translate';
import {ListEmptyComponent} from '../../../components';
import {
  ItemFilter,
  ItemFilterContainer,
} from '../../../components/filter/filter';
import {shortenCityName, shortenDistrictName} from '../../../utils/utils';
import {activeOpacity} from '../../../components/shared';

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
    const filterItems = [];
    if (filter?.city?.Name) {
      filterItems.push(shortenCityName(filter.city.Name));
    }
    if (filter?.district?.Name) {
      filterItems.push(shortenDistrictName(filter.district.Name));
    }
    return filterItems.map((value, index) => (
      <ItemFilter value={value} key={index} />
    ));
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
          <ItemFilterContainer style={styles.itemFilterContainerStyle}>
            {showFilter()}
          </ItemFilterContainer>
          <View>
            <TouchableOpacity
              onPress={onFilterButtonPress}
              activeOpacity={activeOpacity}>
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
            activeOpacity={activeOpacity}
            onPress={() => onDetailClick(item.item)}>
            <CartItem {...item.item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
      {isLoading && (
        <ActivityIndicator style={styles.loading} color={lightTheme.primary} />
      )}
      <Filter
        styleContainer={styles.styleContainer}
        isShow={isShowFilter}
        callBack={filterCallBack}
        showPricePicker={false}
      />
      {role === 1 && (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButtonItem
            title={translate.new}
            onPress={onGotoCreateLogistic}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButtonItem>
          <ActionButtonItem
            title={translate.logistic.myLogistic}
            onPress={onGotoMyLogistic}>
            <Ionicons name="list" style={styles.actionButtonIcon} />
          </ActionButtonItem>
        </ActionButton>
      )}
    </View>
  );
};

export default Logistic;
