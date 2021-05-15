import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {
  Button,
  TextInput,
  CityPicker,
  DistrictPicker,
  StatusPicker,
  CheckBox,
  ImagePicker,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {useCreateInn} from '../hooks/useCreateInn';
import {styles} from './create-inn.style';

const CreateInn = ({route, navigation}) => {
  const {selectors, handlers} = useCreateInn({
    ...route.params?.data,
  });
  const {inn, isLoading, validation} = selectors;

  const {
    handleCreateInn,
    onChangeName,
    onChangeAddress,
    onChangeImages,
    onChangeCity,
    onChangeDistrict,
    onChangeStatus,
    onChangePrice,
    onChangeElectricPrice,
    onChangeWaterPrice,
    onChangeArea,
    onChangeDeposit,
    onChangeMaxRoommate,
    onChangeOwner,
    onChangeContact,
    onChangeWifi,
    onChangeGarage,
    onChangeRoomBed,
    onChangeRoomCloset,
    onChangeRoomKetchen,
    onChangeRoomPetsAllowed,
    onChangeRoomRefrigerator,
    onChangeRoomAirConditioner,
    onChangeRoomTivi,
    onChangeRoomWashingMachine,
    onChangeAttention,
    onChangeNotes,
  } = handlers;

  const onCreateInn = async () => {
    const result = await handleCreateInn();
    if (result) {
      navigation.goBack();
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>{translate.innInfo}</Text>
      <Text>{translate.image}</Text>
      <ImagePicker
        quality={0.2}
        onChangeImages={onChangeImages}
        defaultImages={inn.images}
      />
      <TextInput
        title={translate.post.innName}
        type="outline"
        value={inn.innName}
        onChangeText={onChangeName}
        {...validation.name}
      />
      <CityPicker
        value={inn.innCity}
        setValue={onChangeCity}
        required={true}
        {...validation.city}
      />
      <DistrictPicker
        value={inn.innDistrict}
        setValue={onChangeDistrict}
        cityId={inn.innCity}
        {...validation.district}
      />
      <TextInput
        title={translate.post.innAddress}
        type="outline"
        value={inn.innAddress}
        placeholder={translate.post.addressPlaceholder}
        onChangeText={onChangeAddress}
        {...validation.address}
      />
      <StatusPicker value={inn.innStatus} setValue={onChangeStatus} />
      <TextInput
        title={translate.post.innPrice}
        type="outline"
        value={`${inn.innPrice ?? ''}`}
        onChangeText={onChangePrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
        {...validation.price}
      />
      <TextInput
        title={translate.post.innElectricPrice}
        type="outline"
        value={`${inn.innElectricPrice ?? ''}`}
        onChangeText={onChangeElectricPrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <TextInput
        title={translate.post.innWaterPrice}
        type="outline"
        value={`${inn.innWaterPrice ?? ''}`}
        onChangeText={onChangeWaterPrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <TextInput
        title={translate.post.innArea}
        type="outline"
        value={`${inn.innArea ?? ''}`}
        onChangeText={onChangeArea}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.innDeposit}
        type="outline"
        value={`${inn.innDeposit ?? ''}`}
        onChangeText={onChangeDeposit}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <TextInput
        title={translate.post.maxRoommate}
        type="outline"
        value={`${inn.innMaxRoommate ?? ''}`}
        onChangeText={onChangeMaxRoommate}
        keyboardType="numeric"
      />

      <Text style={styles.sectionHeader}>{translate.ownerInfo}</Text>
      <TextInput
        title={translate.post.innOwner}
        type="outline"
        value={inn.innOwner}
        onChangeText={onChangeOwner}
      />
      <TextInput
        title={translate.post.innContact}
        type="outline"
        value={inn.innContact}
        keyboardType="numeric"
        onChangeText={onChangeContact}
        placeholder={translate.placeholder.phone}
        {...validation.phoneNumber}
      />

      <Text style={styles.sectionHeader}>{translate.post.furniture}</Text>
      <CheckBox
        text={translate.post.innWifi}
        onChange={onChangeWifi}
        checked={inn.innWifi}
      />
      <CheckBox
        text={translate.post.innGarage}
        onChange={onChangeGarage}
        checked={inn.innGarage}
      />
      <CheckBox
        text={translate.post.roomBed}
        onChange={onChangeRoomBed}
        checked={inn.roomBed}
      />
      <CheckBox
        text={translate.post.roomCloset}
        onChange={onChangeRoomCloset}
        checked={inn.roomCloset}
      />
      <CheckBox
        text={translate.post.roomKetchen}
        onChange={onChangeRoomKetchen}
        checked={inn.roomKetchen}
      />
      <CheckBox
        text={translate.post.roomPetsAllowed}
        onChange={onChangeRoomPetsAllowed}
        checked={inn.roomPetsAllowed}
      />
      <CheckBox
        text={translate.post.roomRefrigerator}
        onChange={onChangeRoomRefrigerator}
        checked={inn.roomRefrigerator}
      />
      <CheckBox
        text={translate.post.airConditioner}
        onChange={onChangeRoomAirConditioner}
        checked={inn.roomAirConditioner}
      />
      <CheckBox
        text={translate.post.roomTivi}
        onChange={onChangeRoomTivi}
        checked={inn.roomTivi}
      />
      <CheckBox
        text={translate.post.roomWashingMachine}
        onChange={onChangeRoomWashingMachine}
        checked={inn.roomWashingMachine}
      />

      <Text style={styles.sectionHeader}>{translate.otherInfos}</Text>
      <TextInput
        title={translate.post.attention}
        type="outline"
        value={inn.innAttention}
        onChangeText={onChangeAttention}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />
      <TextInput
        title={translate.post.notes}
        type="outline"
        value={inn.innNotes}
        onChangeText={onChangeNotes}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />
      <View style={styles.buttonWrapper}>
        <Button
          loading={isLoading}
          title={translate.save}
          containerStyle={styles.buttonContainer}
          type="outline"
          onPress={onCreateInn}
        />
      </View>
    </ScrollView>
  );
};

export default CreateInn;
