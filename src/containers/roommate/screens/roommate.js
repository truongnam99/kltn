import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';
import CartItem from '../components/cart-item';
import styles from './roommate.style';
import useRoommate from '../hooks/useRoommate';
import Filter from '../../find-inn/component/filter';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {
  ItemFilter,
  ItemFilterContainer,
} from '../../../components/filter/filter';
import {shortenCityName, shortenDistrictName} from '../../../utils/utils';
import {activeOpacity} from '../../../components/shared';

const Roommate = ({navigation}) => {
  const {selectors, handlers} = useRoommate({navigation});
  const {roommates, userInfo, isLoading, isShowFilter, filter} = selectors;
  const {
    onFilterButtonPress,
    onLoadmore,
    onOpenPost,
    onGetPosted,
    filterCallBack,
    handleFoundRoommate,
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
          <ItemFilterContainer style={styles.filter}>
            {_renderFilter()}
          </ItemFilterContainer>
          <View>
            <TouchableOpacity
              style={styles.iconContainer}
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
        style={styles.flastList}
        data={roommates}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <View style={styles.itemStyle}>
            <CartItem
              {...item.item}
              userInfo={userInfo}
              onFoundRoommate={handleFoundRoommate}
              navigation={navigation}
            />
          </View>
        )}
        ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
        onEndReached={onLoadmore}
        onEndReachedThreshold={100}
        ListEmptyComponent={ListEmptyComponent}
      />
      {userInfo.role === 0 && (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButtonItem title="New" onPress={onOpenPost}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButtonItem>
          <ActionButtonItem title="Posted" onPress={onGetPosted}>
            <Ionicons name="list" style={styles.actionButtonIcon} />
          </ActionButtonItem>
        </ActionButton>
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

export default Roommate;
