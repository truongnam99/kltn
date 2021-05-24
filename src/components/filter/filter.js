import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import * as Amimatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {lightTheme} from '../../config/theme';
import Text from '../text/text';
import Slider from '@ptomasroos/react-native-multi-slider';
import {fadeDownIn, fadeDownOut} from '../../assets/animation';

import {styles} from './filter.style';
import CityPicker from '../picker/city-picker';
import {
  getCity,
  numeralPrice,
  shortenCityName,
  shortenDistrictName,
  shortenPrice,
} from '../../utils/utils';
import {translate} from '../../constants/translate';
import Button from '../button/button';
import DistrictPicker from '../picker/district-picker';

export const FilterModel = memo(
  ({
    show,
    onApplyPress,
    pricePicker = true,
    filterValue,
    handleChangeFilter,
  }) => {
    const DURATION = 300;
    const modalViewRef = useRef(null);
    const [isActive, setIsActive] = useState(show);

    useEffect(() => {
      if (show && !isActive) {
        setIsActive(true);
      } else {
        if (modalViewRef) {
          modalViewRef.current?.animate(fadeDownOut);
        }
        setTimeout(() => {
          setIsActive(false);
        }, DURATION);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const onChangeCity = useCallback(
      value => {
        handleChangeFilter(value(), 'city');
      },
      [handleChangeFilter],
    );

    const onChangeDistrict = useCallback(
      value => {
        handleChangeFilter(value(), 'district');
      },
      [handleChangeFilter],
    );
    const onChangeChangePrice = useCallback(
      value => {
        handleChangeFilter(
          {
            minPrice: value[0],
            maxPrice: value[1],
          },
          'price',
        );
      },
      [handleChangeFilter],
    );

    if (!isActive) {
      return null;
    }

    return (
      <Amimatable.View
        animation={fadeDownIn}
        ref={modalViewRef}
        style={styles.modalView}
        duration={DURATION}>
        {pricePicker && (
          <View>
            <Text>
              Giá từ{' '}
              <Text style={styles.priceStyle}>
                {numeralPrice(filterValue.price.minPrice)}
              </Text>{' '}
              đến{' '}
              <Text style={styles.priceStyle}>
                {numeralPrice(filterValue.price.maxPrice)}
              </Text>
            </Text>
            <Slider
              min={0}
              max={10000000}
              allowOverlap={false}
              values={[filterValue.price.minPrice, filterValue.price.maxPrice]}
              onValuesChange={onChangeChangePrice}
              containerStyle={styles.sliderContainer}
              step={500000}
            />
          </View>
        )}
        <CityPicker
          value={filterValue.city}
          setValue={onChangeCity}
          containerStyle={styles.picker}
        />
        <DistrictPicker
          value={filterValue.district}
          setValue={onChangeDistrict}
          containerStyle={styles.picker}
          cityId={filterValue.city}
        />

        <Button
          title={translate.apply}
          containerStyle={styles.buttonApply}
          onPress={onApplyPress}
        />
      </Amimatable.View>
    );
  },
);

export const Filter = memo(
  ({
    onCallback = () => {
      console.info('dont have onCallback');
    },
    showPricePicker = true,
  }) => {
    const [openModal, setOpenModal] = useState(false);
    const [filterValue, setFilterValue] = useState({
      city: '79',
      district: '',
      price: {
        minPrice: 0,
        maxPrice: 10000000,
      },
    });
    const _renderItemFilter = useCallback(value => {
      return <Text style={styles.itemFilter}>{value}</Text>;
    }, []);

    const onChangeOpenModel = useCallback(() => {
      setOpenModal(!openModal);
    }, [setOpenModal, openModal]);

    const onApplyPress = useCallback(() => {
      onCallback(filterValue);
      setOpenModal(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setOpenModal]);

    const handleChangeFilter = useCallback(
      (value, field) => {
        setFilterValue(preState => {
          return {
            ...preState,
            [field]: value,
          };
        });
      },
      [setFilterValue],
    );

    const _renderFilter = useCallback(() => {
      const filterItems = [];
      if (showPricePicker) {
        const min = shortenPrice(filterValue.price.minPrice);
        const max = shortenPrice(filterValue.price.maxPrice);
        if (filterValue.price.minPrice && filterValue.price.maxPrice) {
          filterItems.push(`${min}-${max}`);
        } else if (filterValue.price.minPrice !== 0) {
          filterItems.push(`> ${min}`);
        } else if (filterValue.price.maxPrice !== 10000000) {
          filterItems.push(`< ${max}`);
        }
      }
      if (filterValue.city) {
        const city = getCity(filterValue.city);
        if (city) {
          filterItems.push(shortenCityName(city.Name));
        }
        if (filterValue.district && city) {
          const district = city.Districts.find(
            item => item.Id === filterValue.district,
          );
          if (district) {
            filterItems.push(shortenDistrictName(district.Name));
          }
        }
      }
      return filterItems.map(value => _renderItemFilter(value));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValue]);

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} style={styles.scroolView}>
          {_renderFilter()}
        </ScrollView>
        <TouchableOpacity activeOpacity={0.8} onPress={onChangeOpenModel}>
          <MaterialIcons
            name="filter-alt"
            size={24}
            color={lightTheme.primary}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
        <FilterModel
          pricePicker={showPricePicker}
          filterValue={filterValue}
          show={openModal}
          handleChangeFilter={handleChangeFilter}
          onApplyPress={onApplyPress}
        />
      </View>
    );
  },
);
