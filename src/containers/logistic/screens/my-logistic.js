import React, {useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import CartItem from '../compoinents/card-item';

import styles from './logistic.style';
import {navigationName} from '../../../constants/navigation';
import {lightTheme} from '../../../config/theme';
import {useMyLogistic} from '../hooks/useMyLogistic';
import {translate} from '../../../constants/translate';
import {activeOpacity} from '../../../components/shared';

const MyLogistic = ({navigation}) => {
  const {handlers, selectors} = useMyLogistic();
  const {logistics, isLoading} = selectors;
  const {handleFetchMyLogistic} = handlers;

  const onGotoCreateLogistic = data => {
    navigation.navigate(navigationName.logistic.createLogistic, {
      data,
    });
  };

  useEffect(() => {
    handleFetchMyLogistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        ListEmptyComponent={<Text>{translate.noDataToShow}</Text>}
      />
      {isLoading && (
        <ActivityIndicator style={styles.loading} color={lightTheme.primary} />
      )}
    </View>
  );
};

export default MyLogistic;
