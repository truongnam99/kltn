import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Button, CityPicker, DistrictPicker} from '../../../components';
import {getCity} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import {fadeDownIn, fadeDownOut} from '../../../assets/animation';
import styles from './filter.style';

const Filter = ({styleContainer, callBack, isShow}) => {
  const animationRef = useRef(null);
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

  return (
    <Animatable.View
      ref={animationRef}
      animation={fadeDownIn}
      duration={350}
      style={StyleSheet.flatten([styles.container, styleContainer])}>
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
