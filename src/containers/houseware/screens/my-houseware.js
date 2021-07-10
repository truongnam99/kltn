import React from 'react';
import {FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useMyHouseware} from '../hooks/useMyHouseware';
import CartItem from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {styles} from './houseware.style';
import {ActionButton} from '../../../components/action-button/action-button';

export const MyHouseware = ({navigation}) => {
  const {selectors, handlers} = useMyHouseware({navigation});
  const {housewares, isLoading} = selectors;
  const {onCartItemPress, onMarkSold, onGotoCreateHouseware} = handlers;

  return (
    <>
      <FlatList
        style={styles.flatlist}
        data={housewares}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <CartItem
            {...item}
            navigation={navigation}
            containerStyle={styles.itemStyle}
            showContact={false}
            isMe={true}
            onMarkSold={onMarkSold}
            onUpdate={onCartItemPress}
            item={item}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={isLoading} />}
        ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
      />
      <ActionButton
        onPress={onGotoCreateHouseware}
        icon={<Ionicons name="md-create" style={styles.actionButtonIcon} />}
      />
    </>
  );
};
