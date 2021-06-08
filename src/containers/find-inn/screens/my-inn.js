import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';

import LargeItem from '../component/large-item';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import {useMyInn} from '../hooks/useMyInn';
import {activeOpacity} from '../../../components/shared';
import {styles} from './my-inn.style';

const MyInn = ({navigation}) => {
  const {seletors, handlers} = useMyInn({navigation});
  const {myInns, loading} = seletors;
  const {onOpenCreateInnLikeUpdate} = handlers;

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
    </>
  );
};

export default MyInn;
