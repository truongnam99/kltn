import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Button, CityPicker, DistrictPicker} from '../../../components';
import {getCity} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import {fadeDownIn, fadeDownOut} from '../../../assets/animation';
import styles from './filter.style';

const Filter = ({styleContainer, callBack, isShow, defaultValue}) => {
  const animationRef = useRef(null);
  const [city, setCity] = useState(defaultValue?.city?.Id || '79');
  const [district, setDistrict] = useState(defaultValue?.district?.Id);
  const [isActive, setIsActive] = useState(isShow);

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

  const onChangeCity = useCallback(
    value => {
      const newCity = value();
      if (newCity !== city) {
        setCity(newCity);
        setDistrict(null);
      }
    },
    [city],
  );

  const onApplyPress = () => {
    const selectCity = getCity(city);
    const selectDistrict = selectCity?.Districts.find(
      item => item.Id === district,
    );
    callBack({
      district: selectDistrict,
      city: selectCity,
    });
  };

  if (!isActive) {
    return null;
  }

  return (
    <Animatable.View
      ref={animationRef}
      animation={fadeDownIn}
      duration={350}
      style={StyleSheet.flatten([styles.container, styleContainer])}>
      <CityPicker
        value={city}
        setValue={onChangeCity}
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
