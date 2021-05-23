import React from 'react';
import {FlatList, View} from 'react-native';
import {
  ActionButton,
  ActionButtonItem,
} from '../../../components/action-button/action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from './houseware.style';
import {useHouseware} from '../hooks/useHouseware';
import CartItem from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {translate} from '../../../constants/translate';

export const Houseware = ({navigation}) => {
  const {selectors, handlers} = useHouseware({navigation});
  const {housewares, loading} = selectors;
  const {onGotoCreateHouseware, onGotoMyPost, onFetchHouseware} = handlers;

  return (
    <View style={styles.container}>
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
          />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButtonItem title={translate.new} onPress={onGotoCreateHouseware}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButtonItem>
        <ActionButtonItem
          title={translate.houseware.myHouseware}
          onPress={onGotoMyPost}>
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButtonItem>
      </ActionButton>
    </View>
  );
};
