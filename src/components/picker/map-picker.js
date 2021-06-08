import React, {memo, useCallback, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './picker.style';

const MapPicker = ({
  mapStyle = {},
  onPickPoint = value => console.log(value),
  defaultValue,
}) => {
  const [point, setPoint] = useState(defaultValue);

  const onMapPress = useCallback(
    event => {
      setPoint(event.nativeEvent.coordinate);
      onPickPoint(event.nativeEvent.coordinate);
    },
    [setPoint, onPickPoint],
  );

  return (
    <MapView
      initialRegion={{
        latitude: 10.821473,
        longitude: 106.62865,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={onMapPress}
      style={[styles.flex1, mapStyle]}>
      {point && <Marker coordinate={point} />}
    </MapView>
  );
};

export default memo(MapPicker);
