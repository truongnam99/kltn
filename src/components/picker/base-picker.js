import React, {memo, useState} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-dropdown-picker';
import {dropdownStyles as styles} from './picker.style';

const BasePicker = ({
  value,
  setValue,
  containerStyle,
  title,
  searchable = false,
  items,
  pickerContainerStype,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const onPress = () => setOpen(!open);
  const onChangeValue = value => {
    setOpen(false);
  };
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>
        {title}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Picker
        items={items}
        open={open}
        onPress={onPress}
        style={[styles.container, pickerContainerStype]}
        value={value}
        setValue={cb => setValue(cb())}
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
        searchable={searchable}
        modalContentContainerStyle={styles.modalContentContainerStyle}
      />
    </View>
  );
};

export default memo(BasePicker);
