import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../text/text';

const MapMarker = ({title, description, coordinate, onPress, ...props}) => {
  const _renderTitle = useCallback(() => {
    if (!title && !description) {
      return;
    }
    return (
      <View style={styles.container}>
        {title && (
          <Text numberOfLines={1} style={[styles.mw100, styles.font]}>
            {title}
          </Text>
        )}
        {description && <Text style={styles.font}>{description}</Text>}
      </View>
    );
  }, [title, description]);

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      {...props}
      style={styles.jc}>
      {_renderTitle()}
      <MaterialCommunityIcons name="map-marker" size={42} color="red" />
    </Marker>
  );
};

export default memo(MapMarker);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
  },
  jc: {
    alignItems: 'center',
  },
  mw100: {
    maxWidth: 100,
  },
  font: {
    fontSize: 12,
  },
});
