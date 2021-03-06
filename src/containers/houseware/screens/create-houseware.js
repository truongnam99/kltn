import React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  BasePicker,
  Button,
  CityPicker,
  DistrictPicker,
  Text,
  TextInput,
} from '../../../components';
import {activeOpacity} from '../../../components/shared';
import {housewareStatus} from '../../../constants/constants';
import {translate} from '../../../constants/translate';
import {HousewareItem} from '../components/houseware-item';
import {useCreateHouseware} from '../hooks/useCreateHouseware';
import {styles} from './create-houseware.style';

export const CreateHouseware = ({navigation, route}) => {
  const {data} = route.params ?? {};
  const {selectors, handlers} = useCreateHouseware({navigation, data});
  const {houseware, loading, validation} = selectors;

  const {
    onChangeContent,
    onChangeCity,
    onItemChangeValue,
    onAddNewItem,
    onRemoveItem,
    onCreateHouseware,
    onChangeStatus,
    onChangeDistrict,
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
        {...validation.content}
        showHint={true}
        type="outline"
      />
      <CityPicker
        value={houseware.city}
        required={true}
        setValue={onChangeCity}
        pickerContainerStype={styles.pickerContainerStype}
        titleStyle={styles.pickerTitleStyle}
      />
      <DistrictPicker
        value={houseware.district}
        required={true}
        setValue={onChangeDistrict}
        pickerContainerStype={styles.pickerContainerStype}
        cityId={houseware.city}
        error={validation.district.error}
        hint={validation.district.hint}
        showHint={true}
        titleStyle={styles.pickerTitleStyle}
      />
      {data && (
        <BasePicker
          title="Tr???ng th??i"
          items={housewareStatus}
          value={houseware.isActive}
          setValue={onChangeStatus}
          pickerContainerStype={styles.pickerContainerStype}
          titleStyle={styles.pickerTitleStyle}
        />
      )}
      {houseware.items.map((item, index) => (
        <>
          <TouchableOpacity
            activeOpacity={activeOpacity}
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
            itemPassed={item}
          />
        </>
      ))}
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={styles.newItem}
        onPress={onAddNewItem}>
        <MaterialIcons name="add" size={32} style={styles.iconAddHouseware} />
        <Text style={styles.textAddHouseware}>{translate.addHouseware}</Text>
      </TouchableOpacity>
      <Button
        title={data ? translate.post.update : translate.post.post}
        onPress={onCreateHouseware}
        loading={loading}
      />
    </ScrollView>
  );
};
