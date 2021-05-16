import React, {memo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-dropdown-picker';
import {translate} from '../../constants/translate';
import {getDistricts} from '../../utils/utils';
import {dropdownStyles as styles} from './picker.style';

const DistrictPicker = ({
  value,
  setValue,
  cityId,
  containerStyle,
  required,
  hint = 'Không được bỏ trống',
  error,
  showHint,
  validate,
  inputRef,
}) => {
  const [open, setOpen] = useState(false);
  const [districts, setDistricts] = useState([]);
  const onPress = () => setOpen(!open);
  useEffect(() => {
    if (cityId) {
      setDistricts(getDistricts(cityId));
    }
  }, [cityId]);

  return (
    <View style={containerStyle}>
      <View style={styles.titleContainer} ref={inputRef}>
        <Text style={styles.title}>
          {translate.district}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
        {showHint && hint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintStyle}>{hint}</Text>
          </View>
        )}
      </View>
      <Picker
        items={districts}
        open={open}
        onPress={onPress}
        style={[styles.container, error && styles.borderError]}
        translation={translate.districtPicker}
        value={value}
        setValue={
          validate
            ? v => {
                validate(v());
                setValue(v);
              }
            : setValue
        }
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
