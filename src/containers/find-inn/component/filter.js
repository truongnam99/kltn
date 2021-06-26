import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';
import * as Animatable from 'react-native-animatable';

import {
  Button,
  CheckBox,
  CityPicker,
  DistrictPicker,
} from '../../../components';
import {getCity, numeralPrice} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import {fadeDownIn, fadeDownOut} from '../../../assets/animation';
import styles from './filter.style';

const MIN_AREA = 10;
const MAX_AREA = 200;
const MIN_RADIUS = 0;
const MAX_RADIUS = 30000;

const Filter = ({
  styleContainer,
  callBack,
  isShow,
  showPricePicker = true,
  typeOfItem,
}) => {
  const animationRef = useRef(null);
  const [isActive, setIsActive] = useState(isShow);
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 10000000,
  });
  const [city, setCity] = useState('79');
  const [district, setDistrict] = useState();
  const [area, setArea] = useState([10, 200]);
  const [garage, setGarage] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [maxRadius, setMaxRadius] = useState([5000]);

  useEffect(() => {
    if (!city) {
      return;
    }

    setDistrict(null);
  }, [city]);

  const onSetDistrict = useCallback(
    value => {
      setDistrict(value());
    },
    [setDistrict],
  );

  const onSetCity = useCallback(
    value => {
      setCity(value());
    },
    [setCity],
  );

  const onChangeArea = useCallback(value => {
    setArea(value);
  }, []);

  const onChangePrice = useCallback(values => {
    setPrice({
      minPrice: values[0],
      maxPrice: values[1],
    });
  }, []);

  const onChangeKitchen = useCallback(value => {
    setKitchen(value);
  }, []);

  const onChangeGarage = useCallback(value => {
    setGarage(value);
  }, []);

  const onChangeMaxRadius = useCallback(value => {
    setMaxRadius(value);
  }, []);

  const onApplyPress = useCallback(() => {
    const selectCity = getCity(city);
    const selectDistrict = selectCity?.Districts.find(
      item => item.Id === district,
    );
    let selectArea = [
      area[0] !== MIN_AREA ? area[0] : null,
      area[1] !== MAX_AREA ? area[1] : null,
    ];
    if (selectArea[0] === null && selectArea[1] === null) {
      selectArea = null;
    }

    callBack({
      price: {
        minPrice: price.minPrice === 0 ? null : price.minPrice,
        maxPrice: price.maxPrice === 10000000 ? null : price.maxPrice,
      },
      district: selectDistrict,
      city: selectCity,
      area: selectArea,
      kitchen,
      garage,
      maxRadius: maxRadius[0],
    });
  }, [callBack, city, district, price, area, kitchen, garage, maxRadius]);

  useEffect(() => {
    if (isShow && !isActive) {
      setIsActive(isShow);
      return;
    }
    if (animationRef) {
      animationRef.current?.animate(fadeDownOut);
      setTimeout(() => {
        setIsActive(isShow);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  if (!isActive) {
    return null;
  }

  return (
    <Animatable.View
      ref={animationRef}
      animation={fadeDownIn}
      duration={350}
      style={StyleSheet.flatten([styles.container, styleContainer])}>
      <KeyboardAvoidingView>
        <CityPicker
          value={city}
          setValue={onSetCity}
          containerStyle={[styles.picker, styles.marginBottom]}
        />
        <DistrictPicker
          value={district}
          setValue={onSetDistrict}
          containerStyle={[styles.picker, styles.marginBottom]}
          cityId={city}
        />
      </KeyboardAvoidingView>
      {showPricePicker && (
        <View style={styles.marginBottom}>
          <Text>
            Giá từ{' '}
            <Text style={styles.priceStyle}>
              {numeralPrice(price.minPrice)}
            </Text>{' '}
            đến{' '}
            <Text style={styles.priceStyle}>
              {numeralPrice(price.maxPrice)}
            </Text>
          </Text>
          <Slider
            min={0}
            max={10000000}
            allowOverlap={false}
            values={[price.minPrice, price.maxPrice]}
            onValuesChange={onChangePrice}
            containerStyle={styles.sliderContainer}
            step={500000}
            sliderLength={190}
          />
        </View>
      )}

      <View style={styles.marginBottom}>
        <Text>
          Diện tích từ <Text style={styles.priceStyle}>{area[0]}</Text> đến{' '}
          <Text style={styles.priceStyle}>{area[1]}</Text> m2
        </Text>
        <Slider
          min={MIN_AREA}
          max={MAX_AREA}
          allowOverlap={false}
          values={[area[0], area[1]]}
          onValuesChange={onChangeArea}
          containerStyle={styles.sliderContainer}
          step={10}
          sliderLength={190}
        />
      </View>
      <View style={styles.marginBottom}>
        <CheckBox
          text={translate.post.innGarage}
          onChange={onChangeGarage}
          checked={garage}
        />
      </View>
      <View style={styles.marginBottom}>
        <CheckBox
          text={translate.post.roomKetchen}
          onChange={onChangeKitchen}
          checked={kitchen}
        />
      </View>
      {typeOfItem === 'map' && (
        <View style={styles.marginBottom}>
          <Text>
            Phạm vi tìm kiếm:{' '}
            <Text style={styles.priceStyle}>{maxRadius / 1000}</Text> Km
          </Text>
          <Slider
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            allowOverlap={false}
            values={maxRadius}
            onValuesChange={onChangeMaxRadius}
            containerStyle={styles.sliderContainer}
            step={1000}
            sliderLength={190}
          />
        </View>
      )}

      <Button
        title={translate.apply}
        containerStyle={styles.buttonApply}
        onPress={onApplyPress}
      />
    </Animatable.View>
  );
};

export default Filter;
