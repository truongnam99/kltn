import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {translate} from '../../../constants/translate';
import CartItem from '../components/cart-item';
import {useMyPost} from '../hooks/useMyPost';
import styles from './roommate.style';

export const MyPost = ({}) => {
  const {selectors, handlers} = useMyPost();
  const {posts, userInfo} = selectors;
  const {handleFoundRoommate} = handlers;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
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
              />
            </View>
          )}
          ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
        />
      </View>
    </View>
  );
};
