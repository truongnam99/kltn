import React from 'react';
import {Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button, CityPicker, TextInput} from '../../../components';
import {translate} from '../../../constants/translate';

import {useCreateHouseware} from '../hooks/useCreateHouseware';
import {styles} from './houseware.style';
import {HousewareItem} from '../components/houseware-item';

export const CreateHouseware = ({navigation}) => {
  const {selectors, handlers} = useCreateHouseware();
  const {post} = selectors;
  const {
    onChangeContent,
    onChangeCity,
    onItemChangeValue,
    onAddNewItem,
    onRemoveItem,
    onPost,
  } = handlers;
  return (
    <ScrollView style={styles.container}>
      <TextInput
        title={translate.content}
        numberOfLines={6}
        multiline={true}
        textInputStyle={styles.content}
        value={post.content}
        onChangeText={onChangeContent}
        required={true}
      />
      <CityPicker
        value={post.location}
        required={true}
        setValue={onChangeCity}
      />
      {post.items.map((item, index) => (
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
        style={styles.row}
        onPress={onAddNewItem}>
        <MaterialIcons name="add" size={32} style={styles.iconAddHouseware} />
        <Text style={styles.textAddHouseware}>{translate.addHouseware}</Text>
      </TouchableOpacity>
      <Button title={translate.post.post} onPress={onPost} />
    </ScrollView>
  );
};
