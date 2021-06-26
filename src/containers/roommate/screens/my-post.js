import React from 'react';
import {FlatList, View} from 'react-native';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import CartItem from '../components/cart-item';
import {useMyPost} from '../hooks/useMyPost';
import styles from './roommate.style';

export const MyPost = ({navigation}) => {
  const {selectors, handlers} = useMyPost({navigation});
  const {posts, userInfo, loading} = selectors;
  const {handleFoundRoommate, onGotoCreateRoommate} = handlers;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index}
      renderItem={item => (
        <View style={styles.itemStyle}>
          <CartItem
            {...item.item}
            userInfo={userInfo}
            showIsActive={true}
            onFoundRoommate={handleFoundRoommate}
            onUpdate={onGotoCreateRoommate}
            item={item.item}
          />
        </View>
      )}
      ListFooterComponent={<FooterListComponent isLoading={loading} />}
      ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      style={styles.flastList}
    />
  );
};
