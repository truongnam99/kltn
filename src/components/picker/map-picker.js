import debounce from 'lodash/debounce';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {TextInput} from '..';
import {showMessageFail} from '../../utils/utils';
import {styles} from './picker.style';
import {MAP_BOX_ACCESS_TOKEN} from '../../config/index';
import Text from '../text/text';
import {activeOpacity} from '../shared';

const MapPicker = ({
  mapStyle = {},
  onPickPoint = value => console.log(value),
  defaultValue,
}) => {
  const [point, setPoint] = useState(defaultValue);
  const [text, setText] = useState();
  const [listPlaces, setListPlaces] = useState([]);

  const onMapPress = useCallback(
    event => {
      setPoint(event.nativeEvent.coordinate);
      onPickPoint(event.nativeEvent.coordinate);
    },
    [setPoint, onPickPoint],
  );

  const onItemSearchPress = useCallback(value => {
    setPoint(value?.coordinate);
    setListPlaces([]);
  }, []);

  const _renderSeachResult = useCallback(() => {
    if (!listPlaces?.length) {
      return null;
    }

    return (
      <View style={styles.searchResultContainer}>
        {listPlaces.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={activeOpacity}
              onPress={() => onItemSearchPress(item)}
              style={styles.searchItem}>
              <Text numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [listPlaces, onItemSearchPress]);

  const delaySearch = useCallback(
    debounce(() => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        text,
      )}.json?access_token=${MAP_BOX_ACCESS_TOKEN}&country=vn`;
      fetch(url)
        .then(result => result.json())
        .then(data => {
          const {features} = data;
          setListPlaces(
            features.map(item => ({
              id: item.id,
              name: item.place_name,
              coordinate: {
                longitude: item.geometry.coordinates[0],
                latitude: item.geometry.coordinates[1],
              },
              type: item.geometry.type,
            })),
          );
        })
        .catch(error => {
          showMessageFail('Lỗi search địa điểm. Vui lòng chọn ở map');
        });
    }, 1000),
    [text],
  );

  const onChangeText = useCallback(value => {
    setText(value);
  }, []);

  useEffect(() => {
    if (text) {
      delaySearch();
      return delaySearch.cancel;
    } else {
      setListPlaces([]);
    }
  }, [text, delaySearch]);

  return (
    <View>
      <TextInput
        placeholder="Nhập địa chỉ tìm kiếm"
        onChangeText={onChangeText}
        value={text}
      />
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
      {_renderSeachResult()}
    </View>
  );
};

export default memo(MapPicker);
