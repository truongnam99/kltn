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
import Filter from '../components/filter';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {
  ItemFilter,
  ItemFilterContainer,
} from '../../../components/filter/filter';
import {shortenCityName, shortenDistrictName} from '../../../utils/utils';
import {activeOpacity} from '../../../components/shared';
import {getGender, getJob} from '../../../constants/constants';

const Roommate = ({navigation}) => {
  const {selectors, handlers} = useRoommate({navigation});
  const {roommates, userInfo, loading, isShowFilter, filter} = selectors;
  const {
    onFilterButtonPress,
    onOpenPost,
    onGetPosted,
    filterCallBack,
    handleFoundRoommate,
    onGotoUpdateRoommate,
    handleFetchRoommate,
  } = handlers;

  const _renderFilter = () => {
    const filterItems = [];
    const {city, district, job, gender} = filter || {};
    if (city?.Name) {
      filterItems.push(shortenCityName(filter.city.Name));
    }
    if (district?.Name) {
      filterItems.push(shortenDistrictName(filter.district.Name));
    }
    if (!job) {
      const jobText = getJob(job);
      if (jobText) {
        filterItems.push(jobText);
      }
    }
    const genderText = getGender(gender);
    if (genderText) {
      filterItems.push(genderText);
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
              onUpdate={onGotoUpdateRoommate}
              item={item.item}
            />
          </View>
        )}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
        onEndReached={handleFetchRoommate}
        onEndReachedThreshold={100}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
      {/* {userInfo.role === 0 && ( */}
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButtonItem title="Tạo" onPress={onOpenPost}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButtonItem>
        <ActionButtonItem title="Bài đã đăng" onPress={onGetPosted}>
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButtonItem>
      </ActionButton>
      {/* )} */}

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
