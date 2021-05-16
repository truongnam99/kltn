import React from 'react';
import {FlatList, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from './houseware.style';
import {useHouseware} from '../hooks/useHouseware';
import {CartItem} from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {translate} from '../../../constants/translate';

export const Houseware = ({navigation}) => {
  const {selectors, handlers} = useHouseware({navigation});
  const {posts, isLoading} = selectors;
  const {onGotoCreateHouseware, onGotoMyPost} = handlers;
  return (
    <View>
      <FlatList
        style={styles.flatlist}
        data={posts}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <CartItem
            {...item}
            navigation={navigation}
            containerStyle={styles.itemStyle}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          title={translate.new}
          onPress={onGotoCreateHouseware}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          title={translate.houseware.myHouseware}
          onPress={onGotoMyPost}>
          <Ionicons name="list" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};
