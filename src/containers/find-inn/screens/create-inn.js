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
  const {selectors, handlers} = useCreateInn({...route.params?.data});
  const {
    images,
    isLoading,
    innName,
    innOwner,
    innStatus,
    innPrice,
    innAddress,
    innElectricPrice,
    innWaterPrice,
    innArea,
    innDeposit,
    innWifi,
    innGarage,
    innDistrict,
    innCity,
    innContact,
    innMaxRoommate,
    innAttention,
    innNotes,
    roomBed,
    roomCloset,
    roomKetchen,
    roomPetsAllowed,
    roomTivi,
    roomRefrigerator,
    roomAirConditioner,
    roomWashingMachine,
  } = selectors;

  const {
    handleSetInnName,
    handleSetInnOwner,
    handleSetInnStatus,
    handleSetInnPrice,
    handleSetInnAddress,
    handleSetInnElectricPrice,
    handleSetInnWaterPrice,
    handleSetInnArea,
    handleSetInnDeposit,
    handleSetInnWifi,
    handleSetInnGarage,
    handleSetInnDistrict,
    handleSetInnCity,
    handleSetInnContact,
    handleSetMaxRoommate,
    handleSetInnAttention,
    handleSetInnNotes,
    handleSetRoomBed,
    handleSetRoomCloset,
    handleSetRoomKetchen,
    handleSetRoomPetsAllowed,
    handleSetRoomRefrigerator,
    handleSetAirConditioner,
    handleSetRoomTivi,
    handleSetRoomWashingMachine,
    handleCreateInn,
    handleChangeImages,
  } = handlers;

  const onCreateInn = async () => {
    await handleCreateInn();
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>{translate.innInfo}</Text>
      <Text>{translate.image}</Text>
      <ImagePicker
        quality={0.2}
        onChangeImages={handleChangeImages}
        defaultImages={images}
      />
      <TextInput
        title={translate.post.innName}
        type="outline"
        value={innName}
        onChangeText={handleSetInnName}
      />
      <CityPicker value={innCity} setValue={handleSetInnCity} />
      <DistrictPicker
        value={innDistrict}
        setValue={handleSetInnDistrict}
        cityId={innCity}
      />
      <TextInput
        title={translate.post.innAddress}
        type="outline"
        value={innAddress}
        placeholder={translate.post.addressPlaceholder}
        onChangeText={handleSetInnAddress}
      />
      <StatusPicker value={innStatus} setValue={handleSetInnStatus} />
      <TextInput
        title={translate.post.innPrice}
        type="outline"
        value={`${innPrice ?? ''}`}
        onChangeText={handleSetInnPrice}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.innElectricPrice}
        type="outline"
        value={`${innElectricPrice ?? ''}`}
        onChangeText={handleSetInnElectricPrice}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.innWaterPrice}
        type="outline"
        value={`${innWaterPrice ?? ''}`}
        onChangeText={handleSetInnWaterPrice}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.innArea}
        type="outline"
        value={`${innArea ?? ''}`}
        onChangeText={handleSetInnArea}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.innDeposit}
        type="outline"
        value={`${innDeposit ?? ''}`}
        onChangeText={handleSetInnDeposit}
        keyboardType="numeric"
      />
      <TextInput
        title={translate.post.maxRoommate}
        type="outline"
        value={`${innMaxRoommate ?? ''}`}
        onChangeText={handleSetMaxRoommate}
        keyboardType="numeric"
      />

      <Text style={styles.sectionHeader}>{translate.ownerInfo}</Text>
      <TextInput
        title={translate.post.innOwner}
        type="outline"
        value={innOwner}
        onChangeText={handleSetInnOwner}
      />
      <TextInput
        title={translate.post.innContact}
        type="outline"
        value={innContact}
        keyboardType="numeric"
        onChangeText={handleSetInnContact}
      />

      <Text style={styles.sectionHeader}>{translate.post.furniture}</Text>
      <CheckBox
        text={translate.post.innWifi}
        onChange={handleSetInnWifi}
        checked={innWifi}
      />
      <CheckBox
        text={translate.post.innGarage}
        onChange={handleSetInnGarage}
        checked={innGarage}
      />
      <CheckBox
        text={translate.post.roomBed}
        onChange={handleSetRoomBed}
        checked={roomBed}
      />
      <CheckBox
        text={translate.post.roomCloset}
        onChange={handleSetRoomCloset}
        checked={roomCloset}
      />
      <CheckBox
        text={translate.post.roomKetchen}
        onChange={handleSetRoomKetchen}
        checked={roomKetchen}
      />
      <CheckBox
        text={translate.post.roomPetsAllowed}
        onChange={handleSetRoomPetsAllowed}
        checked={roomPetsAllowed}
      />
      <CheckBox
        text={translate.post.roomRefrigerator}
        onChange={handleSetRoomRefrigerator}
        checked={roomRefrigerator}
      />
      <CheckBox
        text={translate.post.airConditioner}
        onChange={handleSetAirConditioner}
        checked={roomAirConditioner}
      />
      <CheckBox
        text={translate.post.roomTivi}
        onChange={handleSetRoomTivi}
        checked={roomTivi}
      />
      <CheckBox
        text={translate.post.roomWashingMachine}
        onChange={handleSetRoomWashingMachine}
        checked={roomWashingMachine}
      />

      <Text style={styles.sectionHeader}>{translate.otherInfos}</Text>
      <TextInput
        title={translate.post.attention}
        type="outline"
        value={innAttention}
        onChangeText={handleSetInnAttention}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />
      <TextInput
        title={translate.post.notes}
        type="outline"
        value={innNotes}
        onChangeText={handleSetInnNotes}
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
