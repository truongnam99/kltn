import React from 'react';
import {Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Button, CityPicker, TextInput} from '../../../components';
import {translate} from '../../../constants/translate';
import {HousewareItem} from '../components/houseware-item';
import {useCreateHouseware} from '../hooks/useCreateHouseware';
import {styles} from './create-houseware.style';

export const CreateHouseware = ({navigation}) => {
  const {selectors, handlers} = useCreateHouseware({navigation});
  const {houseware, loading} = selectors;
  const {
    onChangeContent,
    onChangeCity,
    onItemChangeValue,
    onAddNewItem,
    onRemoveItem,
    onCreateHouseware,
  } = handlers;
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <TextInput
        title={translate.content}
        numberOfLines={6}
        multiline={true}
        textInputStyle={styles.content}
        value={houseware.content}
        onChangeText={onChangeContent}
        required={true}
      />
      <CityPicker
        value={houseware.location}
        required={true}
        setValue={onChangeCity}
        pickerContainerStype={styles.cityContainerStyle}
      />
      {houseware.items.map((item, index) => (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={onRemoveItem}>
            <MaterialIcons
              name="remove"
              size={32}
              style={styles.iconAddHouseware}
            />
          </TouchableOpacity>
          <HousewareItem
            key={index}
            onChangeValue={onItemChangeValue}
            index={index}
          />
        </>
      ))}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.newItem}
        onPress={onAddNewItem}>
        <MaterialIcons name="add" size={32} style={styles.iconAddHouseware} />
        <Text style={styles.textAddHouseware}>{translate.addHouseware}</Text>
      </TouchableOpacity>
      <Button
        title={translate.post.post}
        onPress={onCreateHouseware}
        loading={loading}
      />
    </ScrollView>
  );
};
