import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CartItem from '../compoinents/card-item';
import {lightTheme} from '../../../config/theme';
import {activeOpacity} from '../../../components/shared';
import {useMyLogistic} from '../hooks/useMyLogistic';
import styles from './logistic.style';
import {ListEmptyComponent} from '../../../components';
import {ActionButton} from '../../../components/action-button/action-button';

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
      <ActionButton
        onPress={() => onGotoCreateLogistic()}
        icon={<Ionicons name="md-create" style={styles.actionButtonIcon} />}
      />
    </View>
  );
};

export default MyLogistic;
