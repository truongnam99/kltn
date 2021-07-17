import React, {useCallback, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
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
  TextInput,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {styles} from './houseware.style';
import {ModalComment} from '../../../components/modal-comment';
import {globalStyles} from '../../../global.style';
import {SearchIcon} from '../../../components/icon';

export const Houseware = ({navigation}) => {
  const [id, setId] = useState();
  const {selectors, handlers} = useHouseware({navigation});
  const {housewares, loading, uid, filter, searchText} = selectors;
  const {
    onGotoCreateHouseware,
    onGotoMyPost,
    onFetchHouseware,
    handleApplyFilter,
    onCartItemPress,
    onMarkSold,
    onChangeSearchText,
    onSearch,
  } = handlers;

  const onOpenCommentModal = useCallback(id => {
    setId(id);
  }, []);

  const onCloseCommentModal = useCallback(() => {
    setId(null);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[globalStyles.row, styles.searchContainer]}>
        <TextInput
          containerStyle={styles.searchContainerStyle}
          textInputStyle={styles.searchTextInputStyle}
          value={searchText}
          onChangeText={onChangeSearchText}
        />
        <View>
          <TouchableOpacity
            onPress={onSearch}
            activeOpacity={0.8}
            style={styles.searchButton}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
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
            onOpenCommentModal={onOpenCommentModal}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
      />
      <ModalComment id={id} visible={!!id} onClose={onCloseCommentModal} />
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
