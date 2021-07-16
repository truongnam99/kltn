import React from 'react';
import {FlatList, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';
import {useHouseware} from '../hooks/useHouseware';
import CartItem from '../components/cart-item';
import {
  ListEmptyComponent,
  FooterListComponent,
  Filter,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {styles} from './houseware.style';

export const Houseware = ({navigation}) => {
  const {selectors, handlers} = useHouseware({navigation});
  const {housewares, loading, uid, filter} = selectors;
  const {
    onGotoCreateHouseware,
    onGotoMyPost,
    onFetchHouseware,
    handleApplyFilter,
    onCartItemPress,
    onMarkSold,
  } = handlers;

  return (
    <View style={styles.container}>
      <View style={styles.filter} onStartShouldSetResponder={() => true}>
        <Filter
          showPricePicker={false}
          onCallback={handleApplyFilter}
          defaultValue={filter}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={housewares}
        keyExtractor={(item, index) => index}
        onEndReached={onFetchHouseware}
        onEndReachedThreshold={0}
        renderItem={({item}) => (
          <CartItem
            {...item}
            navigation={navigation}
            containerStyle={styles.itemStyle}
            isMe={uid === item.owner.uid}
            onMarkSold={onMarkSold}
            onUpdate={onCartItemPress}
            item={item}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButtonItem
          title={translate.new}
          onPress={onGotoCreateHouseware}
          key={0}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButtonItem>
        <ActionButtonItem
          key={1}
          title={translate.houseware.myHouseware}
          onPress={onGotoMyPost}>
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButtonItem>
      </ActionButton>
    </View>
  );
};
