import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useHooks from '../find-inn/hooks';

export default function Test() {
  const {handlers, selectors} = useHooks();
  const {handleFetchInn} = handlers;
  const {isLoading} = selectors;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleFetchInn()} style={styles.c4}>
        <Text>Test call saga</Text>
        {isLoading && <Text>Loading</Text>}
        {!isLoading && <Text>Not Loading</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
});
