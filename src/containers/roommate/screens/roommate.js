import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import CartItem from '../components/cart-item';
import styles from './roommate.style';
import {navigationName} from '../../../constants/navigation';
import useHook from '../hooks';
import Filter from '../../find-inn/component/filter';
import {FooterListComponent} from '../../../components';

const Roommate = ({navigation, ...props}) => {
  const {selectors, handlers} = useHook();
  const {roommates, userInfo, isLoading} = selectors;
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState();
  const {handleFetchRoommate, handleFoundRoommate} = handlers;

  const onOpenPost = () => {
    navigation.navigate(navigationName.roommate.post);
  };

  const onFilterButtonPress = () => {
    setIsShowFilter(!isShowFilter);
  };

  const filterCallBack = value => {
    setIsShowFilter(false);
    handleFetchRoommate({
      reload: true,
      cityId: value.city?.Id,
      districtId: value.district?.Id,
    });
    setFilter(value);
  };

  const onGetPosted = () => {
    handleFetchRoommate({reload: true, isMe: true});
  };

  useEffect(() => {
    handleFetchRoommate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoadmore = () => {
    handleFetchRoommate({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
    });
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
      <View style={styles.itemContainer}>
        <FlatList
          data={roommates}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            <View style={styles.itemStyle}>
              <CartItem
                {...item.item}
                userInfo={userInfo}
                onFoundRoommate={handleFoundRoommate}
              />
            </View>
          )}
          ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
          onEndReached={onLoadmore}
          onEndReachedThreshold={100}
        />
      </View>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item title="New" onPress={onOpenPost}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item title="Posted" onPress={onGetPosted}>
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

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
