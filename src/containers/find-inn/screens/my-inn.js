import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {FooterListComponent, ListEmptyComponent} from '../../../components';
import LargeItem from '../component/large-item';
import {useMyInn} from '../hooks/useMyInn';
import {navigationName} from '../../../constants/navigation';
import {styles} from './my-inn.style';
import {activeOpacity} from '../../../components/shared';

const MyInn = ({navigation}) => {
  const {seletors, handlers} = useMyInn();
  const {myInns} = seletors;
  const {handleFetchMyInn} = handlers;
  const onOpenCreateInnLikeUpdate = data => {
    navigation.navigate(navigationName.findInn.createInn, {
      data: {...data, isUpdate: true},
    });
  };

  useEffect(() => {
    handleFetchMyInn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      key={1}
      numColumns={1}
      data={myInns}
      keyExtractor={(item, index) => index}
      style={styles.list}
      ListFooterComponent={<FooterListComponent />}
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
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default MyInn;
