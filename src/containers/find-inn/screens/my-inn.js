import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LargeItem from '../component/large-item';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {useMyInn} from '../hooks/useMyInn';
import {activeOpacity} from '../../../components/shared';
import {styles} from './my-inn.style';
import {ActionButton} from '../../../components/action-button/action-button';

const MyInn = ({navigation}) => {
  const {seletors, handlers} = useMyInn({navigation});
  const {myInns, loading} = seletors;
  const {onOpenCreateInnLikeUpdate, onGotoCreateInn} = handlers;

  return (
    <>
      <FlatList
        key={1}
        numColumns={1}
        data={myInns}
        keyExtractor={(item, index) => index}
        style={styles.list}
        ListFooterComponent={<FooterListComponent isLoading={loading} />}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => onOpenCreateInnLikeUpdate({data: item.item})}
            activeOpacity={activeOpacity}>
            <LargeItem
              images={item.item.upload_room_images}
              room_name={item.item.room_name}
              room_price={item.item.room_price}
              electric_price={item.item.electric_price}
              water_price={item.item.water_price}
              exact_room_address={item.item.exact_room_address}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
      <ActionButton
        onPress={onGotoCreateInn}
        icon={<Ionicons name="md-create" size={20} color="white" />}
      />
    </>
  );
};

export default MyInn;
