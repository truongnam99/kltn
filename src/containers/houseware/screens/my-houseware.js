import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useMyHouseware} from '../hooks/useMyHouseware';
import CartItem from '../components/cart-item';
import {ListEmptyComponent, FooterListComponent} from '../../../components';
import {styles} from './houseware.style';
import {ActionButton} from '../../../components/action-button/action-button';
import {ModalComment} from '../../../components/modal-comment';

export const MyHouseware = ({navigation}) => {
  const [id, setId] = useState();
  const {selectors, handlers} = useMyHouseware({navigation});
  const {housewares, isLoading} = selectors;
  const {onCartItemPress, onMarkSold, onGotoCreateHouseware} = handlers;

  const onOpenCommentModal = useCallback(id => {
    setId(id);
  }, []);

  const onCloseCommentModal = useCallback(() => {
    setId(null);
  }, []);

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
            onOpenCommentModal={onOpenCommentModal}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={isLoading} />}
        ListFooterComponent={<FooterListComponent isLoading={isLoading} />}
      />
      <ModalComment id={id} visible={!!id} onClose={onCloseCommentModal} />
      <ActionButton
        onPress={onGotoCreateHouseware}
        icon={<Ionicons name="md-create" style={styles.actionButtonIcon} />}
      />
    </>
  );
};
