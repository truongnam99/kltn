import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';

import {useMyHouseware} from '../hooks/useMyHouseware';
import CartItem from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {activeOpacity} from '../../../components/shared';
import {styles} from './houseware.style';

export const MyHouseware = ({navigation}) => {
  const {selectors, handlers} = useMyHouseware({navigation});
  const {housewares, isLoading} = selectors;
  const {onCartItemPress, onMarkSold} = handlers;

  return (
    <FlatList
      style={styles.flatlist}
      data={housewares}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onCartItemPress(item)}
          activeOpacity={activeOpacity}>
          <CartItem
            {...item}
            navigation={navigation}
            containerStyle={styles.itemStyle}
            showContact={false}
            isMe={true}
            onMarkSold={onMarkSold}
          />
        </TouchableOpacity>
      )}
      ListEmptyComponent={<ListEmptyComponent loading={isLoading} />}
      ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
    />
  );
};
