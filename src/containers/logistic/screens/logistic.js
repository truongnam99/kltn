import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';
import CartItem from '../compoinents/card-item';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {
  ItemFilter,
  ItemFilterContainer,
} from '../../../components/filter/filter';
import {useLogistic} from '../hooks/useLogistic';
import {translate} from '../../../constants/translate';
import {shortenCityName, shortenDistrictName} from '../../../utils/utils';
import {activeOpacity} from '../../../components/shared';
import styles from './logistic.style';
import Filter from '../compoinents/filter';

const Logistic = ({navigation}) => {
  const {handlers, selectors} = useLogistic({navigation});
  const {logistics, loading, role, isShowFilter, filter} = selectors;
  const {
    filterCallBack,
    onDetailClick,
    onFilterButtonPress,
    onGotoCreateLogistic,
    onGotoMyLogistic,
    onFetchLogistic,
  } = handlers;

  const _renderFilter = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <ItemFilterContainer style={styles.itemFilterContainerStyle}>
            {_renderFilter()}
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
        onEndReached={onFetchLogistic}
        onEndReachedThreshold={0}
        renderItem={item => (
          <TouchableOpacity
            style={styles.cartItem}
            activeOpacity={activeOpacity}
            onPress={() => onDetailClick(item.item)}>
            <CartItem {...item.item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
      />
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
