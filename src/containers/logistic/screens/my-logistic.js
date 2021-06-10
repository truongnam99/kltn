import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import CartItem from '../compoinents/card-item';
import {lightTheme} from '../../../config/theme';
import {activeOpacity} from '../../../components/shared';
import {useMyLogistic} from '../hooks/useMyLogistic';
import styles from './logistic.style';
import {ListEmptyComponent} from '../../../components';

const MyLogistic = ({navigation}) => {
  const {handlers, selectors} = useMyLogistic({navigation});
  const {logistics, loading} = selectors;
  const {onGotoCreateLogistic} = handlers;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={logistics}
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <TouchableOpacity
            style={styles.cartItem}
            activeOpacity={activeOpacity}
            onPress={() => onGotoCreateLogistic(item.item)}>
            <CartItem {...item.item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
      {loading && (
        <ActivityIndicator style={styles.loading} color={lightTheme.primary} />
      )}
    </View>
  );
};

export default MyLogistic;
