import React, {useCallback} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../component/header';
import LargeItem from '../component/large-item';
import SmallItem from '../component/small-item';
import MapInn from '../component/map-inn';
import styles from './find-inn.style';
import Filter from '../component/filter';
import {translate} from '../../../constants/translate';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {activeOpacity} from '../../../components/shared';
import {useInn} from '../hooks/useInn';
import {lightTheme} from '../../../config/theme';
import {
  shortenCityName,
  shortenDistrictName,
  shortenPrice,
} from '../../../utils/utils';
import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';
import {
  ItemFilter,
  ItemFilterContainer,
} from '../../../components/filter/filter';

const FindInn = ({navigation}) => {
  const {handlers, selectors} = useInn({navigation});
  const {
    loading,
    inns,
    role,
    filter,
    typeOfItem,
    headerText,
    isShowFilter,
    location,
  } = selectors;
  const {
    onChangeView,
    onFetchInn,
    onHeaderChangeText,
    onOpenFilter,
    filterCallBack,
    onViewDetail,
    onGotoCreateInn,
    onGotoMyInn,
    onChangeLocation,
  } = handlers;

  const _renderFilter = () => {
    if (!filter) {
      return null;
    }
    const filterItems = [];
    const {price, district, city, area, kitchen, garage} = filter;
    if (city?.Name) {
      filterItems.push(shortenCityName(city.Name));
    }
    if (district?.Name) {
      filterItems.push(shortenDistrictName(district.Name));
    }
    if (price) {
      const min = shortenPrice(price.minPrice);
      const max = shortenPrice(price.maxPrice);
      if (price.minPrice && price.maxPrice) {
        filterItems.push(`${min}-${max}`);
      } else if (price.minPrice) {
        filterItems.push(`> ${min}`);
      } else if (price.maxPrice) {
        filterItems.push(`< ${max}`);
      }
    }

    if (area) {
      if (area[0] && area[1]) {
        filterItems.push(`${area[0]}-${area[1]}m2`);
      } else if (area[0]) {
        filterItems.push(`> ${area[0]}m2`);
      } else if (area[1]) {
        filterItems.push(`< ${area[1]}m2`);
      }
    }
    if (kitchen) {
      filterItems.push('Có bếp');
    }
    if (garage) {
      filterItems.push('Có chỗ gửi xe');
    }
    return filterItems.map((value, index) => (
      <ItemFilter value={value} key={index} />
    ));
  };

  const _renderLargeType = useCallback(() => {
    return (
      <FlatList
        style={styles.flatList}
        key={1}
        numColumns={1}
        data={inns}
        keyExtractor={(item, index) => index}
        onEndReached={onFetchInn}
        onEndReachedThreshold={0}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => onViewDetail(item.item)}
            activeOpacity={activeOpacity}>
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
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inns, loading]);

  const _renderSmallType = useCallback(() => {
    return (
      <FlatList
        key={2}
        style={styles.flatListSmall}
        numColumns={2}
        data={inns}
        keyExtractor={(item, index) => index}
        onEndReached={onFetchInn}
        onEndReachedThreshold={0}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
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
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
    );
  }, [inns, loading, onFetchInn, onViewDetail]);

  const _renderMap = useCallback(() => {
    return (
      <MapInn
        inns={inns}
        onViewDetail={onViewDetail}
        typeOfItem={typeOfItem}
        location={location}
        onChooseLocation={onChangeLocation}
      />
    );
  }, [inns, typeOfItem, location, onViewDetail, onChangeLocation]);

  const _renderItem = useCallback(() => {
    switch (typeOfItem) {
      case 'small':
        return _renderSmallType();
      case 'map':
        return _renderMap();
      default:
        return _renderLargeType();
    }
  }, [typeOfItem, _renderSmallType, _renderLargeType, _renderMap]);

  const _renderIconChange = useCallback(() => {
    switch (typeOfItem) {
      case 'small':
        return <MaterialIcons name="map" size={24} style={styles.filterIcon} />;
      case 'map':
        return (
          <MaterialIcons
            name="view-list"
            size={24}
            style={styles.filterIcon}
            color={lightTheme.primary}
          />
        );
      default:
        return (
          <MaterialIcons
            name="filter-none"
            size={24}
            style={styles.filterIcon}
          />
        );
    }
  }, [typeOfItem]);

  return (
    <View style={styles.container}>
      <Header
        onPress={() => onFetchInn({reload: true})}
        onChangeText={onHeaderChangeText}
        value={headerText}
      />
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <ItemFilterContainer style={styles.filter}>
            {_renderFilter()}
          </ItemFilterContainer>
          <View style={styles.mr6}>
            <TouchableOpacity
              onPress={onOpenFilter}
              activeOpacity={activeOpacity}>
              <MaterialIcons
                name="filter-alt"
                size={24}
                style={styles.changeView}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.changeViewContainer}>
            <TouchableOpacity
              onPress={() => {
                onChangeView();
              }}
              activeOpacity={activeOpacity}>
              {_renderIconChange()}
            </TouchableOpacity>
          </View>
        </View>
        {_renderItem()}
      </View>
      <Filter
        isShow={isShowFilter}
        callBack={filterCallBack}
        typeOfItem={typeOfItem}
      />
      {role === 1 && (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButtonItem title={translate.new} onPress={onGotoCreateInn}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButtonItem>
          <ActionButtonItem title={translate.inn.myInn} onPress={onGotoMyInn}>
            <Ionicons name="list" style={styles.actionButtonIcon} />
          </ActionButtonItem>
        </ActionButton>
      )}
    </View>
  );
};

export default FindInn;
