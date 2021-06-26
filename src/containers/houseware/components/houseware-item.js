import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {ImagePicker, TextInput} from '../../../components';
import {styles} from './houseware-item.style';
import {noImage} from '../../../constants/string';
import {translate} from '../../../constants/translate';

export const HousewareItem = ({
  onChangeValue,
  index,
  itemPassed = {
    image: noImage,
    price: '',
    description: '',
  },
}) => {
  const [item, setItem] = useState(itemPassed);

  const onChangeImages = value => {
    if (value.length < 0) {
      return;
    }
    setItem(preState => {
      return {
        ...preState,
        image: value[0].uri,
      };
    });
  };

  const onChangePrice = value => {
    setItem(preState => {
      return {
        ...preState,
        price: value,
      };
    });
  };

  const onChangeDescription = value => {
    setItem(preState => {
      return {
        ...preState,
        description: value,
      };
    });
  };

  useEffect(() => {
    onChangeValue(item, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.photo}>
          <ImagePicker
            maxFile={1}
            quality={0.2}
            onChangeImages={onChangeImages}
            imageStyle={styles.image}
            defaultImages={[{uri: item.image}]}
          />
        </View>
        <View style={styles.detail}>
          <TextInput
            title={translate.price}
            onChangeText={onChangePrice}
            value={item.price}
          />
          <TextInput
            title={translate.description}
            onChangeText={onChangeDescription}
            value={item.description}
          />
        </View>
      </View>
    </View>
  );
};
