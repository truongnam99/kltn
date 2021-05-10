import React, {memo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-dropdown-picker';
import {translate} from '../../constants/translate';
import {getDistricts} from '../../utils/utils';
import {dropdownStyles as styles} from './picker.style';

const DistrictPicker = ({value, setValue, cityId}) => {
  const [open, setOpen] = useState(false);
  const [districts, setDistricts] = useState([]);
  const onPress = () => setOpen(!open);
  useEffect(() => {
    if (cityId) {
      setDistricts(getDistricts(cityId));
    }
  }, [cityId]);

  return (
    <View>
      <Text style={styles.title}>{translate.district}</Text>
      <Picker
        items={districts}
        open={open}
        onPress={onPress}
        style={styles.container}
        translation={translate.districtPicker}
        value={value}
        setValue={setValue}
        onChangeValue={() => setOpen(false)}
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

export default memo(DistrictPicker);
