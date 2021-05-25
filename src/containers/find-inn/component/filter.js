import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';
import * as Animatable from 'react-native-animatable';

import {Button, CityPicker, DistrictPicker} from '../../../components';
import {getCity, numeralPrice} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import styles from './filter.style';
import {fadeDownIn, fadeDownOut} from '../../../assets/animation';

const Filter = ({styleContainer, callBack, isShow, showPricePicker = true}) => {
  const animationRef = useRef(null);
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 10000000,
  });
  const [city, setCity] = useState('79');
  const [district, setDistrict] = useState();
  const [isActive, setIsActive] = useState(isShow);

  useEffect(() => {
    if (!city) {
      return;
    }

    setDistrict(null);
  }, [city]);

  const handleSetDistrict = useCallback(
    value => {
      setDistrict(value);
    },
    [setDistrict],
  );

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

  const onPriceSelectChange = values => {
    setPrice({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };
  const onApplyPress = () => {
    const selectCity = getCity(city);
    const selectDistrict = selectCity?.Districts.find(
      item => item.Id === district,
    );
    callBack({
      price: {
        minPrice: price.minPrice === 0 ? null : price.minPrice,
        maxPrice: price.maxPrice === 10000000 ? null : price.maxPrice,
      },
      district: selectDistrict,
      city: selectCity,
    });
  };

  return (
    <Animatable.View
      ref={animationRef}
      animation={fadeDownIn}
      duration={350}
      style={StyleSheet.flatten([styles.container, styleContainer])}>
      {showPricePicker && (
        <View>
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
            onValuesChange={onPriceSelectChange}
            containerStyle={styles.sliderContainer}
            step={500000}
            sliderLength={190}
          />
        </View>
      )}
      <CityPicker
        value={city}
        setValue={setCity}
        containerStyle={styles.picker}
      />
      <DistrictPicker
        value={district}
        setValue={handleSetDistrict}
        containerStyle={styles.picker}
        cityId={city}
      />

      <Button
        title={translate.apply}
        containerStyle={styles.buttonApply}
        onPress={onApplyPress}
      />
    </Animatable.View>
  );
};

export default Filter;
