import React from 'react';
import {FlatList, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from './houseware.style';
import {useMyPost} from '../hooks/useMyPost';
import {CartItem} from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {translate} from '../../../constants/translate';

export const MyPost = ({navigation}) => {
  const {selectors} = useMyPost({navigation});
  const {posts, isLoading} = selectors;
  return (
    <FlatList
      style={styles.flatlist}
      data={posts}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => (
        <CartItem
          {...item}
          navigation={navigation}
          containerStyle={styles.itemStyle}
          showContact={false}
        />
      )}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
    />
  );
};
