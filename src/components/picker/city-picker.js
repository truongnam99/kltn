import React, {memo, useState} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-dropdown-picker';
import {translate} from '../../constants/translate';
import {cities} from '../../utils/utils';
import {dropdownStyles as styles} from './picker.style';

const CityPicker = ({value, setValue, containerStyle}) => {
  const [open, setOpen] = useState(false);
  const onPress = () => setOpen(!open);
  const onChangeValue = value => {
    setOpen(false);
  };
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{translate.city}</Text>
      <Picker
        items={cities}
        open={open}
        onPress={onPress}
        style={styles.container}
        translation={translate.cityPicker}
        value={value}
        setValue={setValue}
        onChangeValue={onChangeValue}
        onClose={() => setOpen(false)}
        listMode="MODAL"
        modalProps={{
          transparent: true,
          presentationStyle: 'overFullScreen',
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        modalContentContainerStyle={styles.modalContentContainerStyle}
      />
    </View>
  );
};

export default memo(CityPicker);
