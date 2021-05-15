import React, {memo, useState} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-dropdown-picker';
import {translate} from '../../constants/translate';
import {dropdownStyles as styles} from './picker.style';

const StatusPicker = ({value, setValue, required}) => {
  const status = [
    {value: 1, label: translate.available},
    {value: 0, label: translate.unavailable},
  ];
  const [open, setOpen] = useState(false);
  const onPress = () => setOpen(!open);
  return (
    <View>
      <Text style={styles.title}>
        {translate.status} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Picker
        items={status}
        open={open}
        onPress={onPress}
        style={styles.container}
        translation={translate.statusPicker}
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
        searchable={false}
        modalContentContainerStyle={[
          styles.modalContentContainerStyle,
          styles.mvStatus,
        ]}
      />
    </View>
  );
};

export default memo(StatusPicker);
