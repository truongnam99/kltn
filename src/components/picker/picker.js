import React from 'react';
import {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import {activeOpacity} from '../shared';
import {styles} from './picker.style';

const PickerItem = ({value}) => {
  return <Text style={styles.item}>{value}</Text>;
};

const Picker = ({
  items = [],
  style,
  itemStyle,
  value = {value: 'select value'},
  onChange = () => console.log('You must be implement onChange'),
}) => {
  const [isShowSelect, setIsShowSelect] = useState(false);

  const handleOnChange = item => {
    setIsShowSelect(false);
    onChange(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsShowSelect(!isShowSelect)}>
          <Text numberOfLines={1}>{value?.value}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isShowSelect} transparent={true}>
        <View style={styles.centerView}>
          <ScrollView style={styles.itemContainer}>
            {items.length &&
              items.map(item => (
                <TouchableOpacity
                  activeOpacity={activeOpacity}
                  key={item.key}
                  onPress={() => handleOnChange(item)}>
                  <PickerItem value={item.value} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Picker;
