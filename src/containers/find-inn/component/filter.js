import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';

import {Button, Picker} from '../../../components';
import {numeralPrice} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import styles from './filter.style';
import province from '../../../constants/provice.json';

const Filter = ({styleContainer, callBack, isShow}) => {
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 10000000,
  });
  const [city, setCity] = useState({
    Id: '79',
    Name: 'Thành phố Hồ Chí Minh',
  });
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({Id: '', Name: ''});

  useEffect(() => {
    if (!city.Id) {
      return;
    }

    setDistricts(
      province
        .find(item => item.Id === city.Id)
        .Districts.map(dt => {
          return {
            key: dt.Id,
            value: dt.Name,
          };
        }),
    );
  }, [city]);

  if (!isShow) {
    return null;
  }

  const onPriceSelectChange = values => {
    setPrice({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const onChangeCity = value => {
    setCity({
      Id: value.key,
      Name: value.value,
    });
  };

  const onChangeDistrict = value => {
    setDistrict({
      Id: value.key,
      Name: value.value,
    });
  };

  const onApplyPress = () => {
    callBack({price, district, city});
  };

  return (
    <View style={StyleSheet.flatten([styles.container, styleContainer])}>
      <Text>
        Giá từ{' '}
        <Text style={styles.priceStyle}>{numeralPrice(price.minPrice)}</Text>{' '}
        đến{' '}
        <Text style={styles.priceStyle}>{numeralPrice(price.maxPrice)}</Text>
      </Text>
      <Slider
        min={0}
        max={10000000}
        allowOverlap={false}
        values={[price.minPrice, price.maxPrice]}
        onValuesChange={onPriceSelectChange}
        containerStyle={styles.sliderContainer}
        step={500000}
      />
      <Text>{translate.city}</Text>
      <Picker
        items={province.map(item => {
          return {
            key: item.Id,
            value: item.Name,
          };
        })}
        value={{key: city.Id, value: city.Name}}
        onChange={onChangeCity}
      />

      <Text>{translate.district}</Text>
      <Picker
        items={districts}
        value={{value: district.Name}}
        onChange={onChangeDistrict}
      />

      <Button
        title={translate.apply}
        containerStyle={styles.buttonApply}
        onPress={onApplyPress}
      />
    </View>
  );
};

export default Filter;
