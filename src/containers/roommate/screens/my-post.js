import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {ActionButton} from '../../../components/action-button/action-button';
import {ModalComment} from '../../../components/modal-comment';
import CartItem from '../components/cart-item';
import {useMyPost} from '../hooks/useMyPost';
import styles from './roommate.style';

export const MyPost = ({navigation}) => {
  const [id, setId] = useState();
  const {selectors, handlers} = useMyPost({navigation});
  const {posts, userInfo, loading} = selectors;
  const {handleFoundRoommate, onGotoCreateRoommate, onOpenPost} = handlers;

  const onOpenCommentModal = useCallback(id => {
    setId(id);
  }, []);

  const onCloseCommentModal = useCallback(() => {
    setId(null);
  }, []);

  return (
    <>
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
              onOpenCommentModal={onOpenCommentModal}
            />
          </View>
        )}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        style={styles.flastList}
      />
      <ActionButton
        onPress={onOpenPost}
        icon={<Ionicons name="md-create" style={styles.actionButtonIcon} />}
      />
      <ModalComment id={id} visible={!!id} onClose={onCloseCommentModal} />
    </>
  );
};
