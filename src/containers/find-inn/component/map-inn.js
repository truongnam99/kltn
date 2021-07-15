import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Circle, Marker as MapMarker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import {shortenPrice} from '../../../utils/utils';
import {Image, Marker, Text} from '../../../components';
import {activeOpacity} from '../../../components/shared';
import {styles} from './map-inn.style';
import {lightTheme} from '../../../config/theme';
import {ElectrictIcon, WaterIcon} from '../../../components/icon';

const MapInn = ({
  inns,
  onViewDetail,
  location,
  onChooseLocation = () => console.log('implement onChooseLocation'),
  typeOfItem,
  radius = 5000,
  ...props
}) => {
  const mapRef = useRef(null);
  const [inn, setInn] = useState(null);
  const [showInnContainer, setShowInnContainer] = useState(false);
  const innContainerRef = useRef(null);

  const onCloseInnContainer = useCallback(() => {
    setShowInnContainer(false);
  }, []);

  const _renderInnContainer = useCallback(() => {
    if (!inn) {
      return null;
    }

    if (!showInnContainer) {
      return null;
    }

    return (
      <Animatable.View style={styles.innContainer} ref={innContainerRef}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => onViewDetail(inn)}>
          <Image image={inn.upload_room_images[0]} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.innInfoContainer}>
          <Text types="h1,bold" numberOfLines={2}>
            {inn.room_name}
          </Text>
          <Text numberOfLines={2}>{inn.exact_room_address}</Text>
          <Text>{' $ ' + shortenPrice(inn.room_price)}</Text>
          <Text>
            <ElectrictIcon size={16} />
            {shortenPrice(inn.electric_price)}
          </Text>
          <Text>
            <WaterIcon size={16} />
            {shortenPrice(inn.water_price)}
          </Text>
        </View>
        <MaterialIcons
          name="close"
          size={24}
          style={styles.iconClose}
          onPress={onCloseInnContainer}
        />
      </Animatable.View>
    );
  }, [inn, showInnContainer, onCloseInnContainer, onViewDetail]);
  const onMakerPress = useCallback(
    value => {
      setInn(value);
      setShowInnContainer(true);
    },
    [setInn],
  );

  const onMapPress = useCallback(
    event => {
      if (typeOfItem === 'map') {
        onChooseLocation(event.nativeEvent.coordinate);
      }
    },
    [typeOfItem, onChooseLocation],
  );

  const _renderMaker = useCallback(() => {
    if (!location) {
      return null;
    }
    return (
      <>
        {inns
          .filter(item => item.coordinate)
          .map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={item.coordinate}
                description={shortenPrice(item.room_price)}
                onPress={() => {
                  onMakerPress(item);
                }}
              />
            );
          })}
      </>
    );
  }, [inns, location, onMakerPress]);

  const _renderLocation = useCallback(() => {
    if (!location) {
      return null;
    }
    return (
      <>
        <Circle
          radius={radius}
          center={location}
          fillColor="#5eba7d46"
          strokeWidth={0}
        />
        <MapMarker coordinate={location} pinColor={lightTheme.primary} />
      </>
    );
  }, [location, radius]);

  useEffect(() => {
    if (location && mapRef?.current) {
      mapRef.current.animateCamera({center: location});
    }
  }, [location]);
  return (
    <View style={styles.container}>
      <View style={styles.hint}>
        <Text>Chọn địa điểm để tìm kiếm</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={{
          latitude: 10.821473,
          longitude: 106.62865,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={onMapPress}>
        {_renderMaker()}
        {_renderLocation()}
      </MapView>
      {_renderInnContainer()}
    </View>
  );
};

export default memo(MapInn);
