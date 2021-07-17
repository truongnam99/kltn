import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  Button,
  TextInput,
  CityPicker,
  DistrictPicker,
  StatusPicker,
  CheckBox,
  ImagePicker,
  Text,
  MapPicker,
  BasePicker,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {useCreateInn} from '../hooks/useCreateInn';
import {styles} from './create-inn.style';
import {DeleteConfirm} from '../../../components/delete-confirm/delete-confirm';
import {typeInns} from '../../../constants/constants';

const CustomInput = props => {
  return (
    <TextInput
      type="outline"
      textInputStyle={styles.textInputStyle}
      titleStyle={styles.titleStyle}
      containerStyle={styles.containerStyle}
      {...props}
    />
  );
};

const CreateInn = ({route, navigation}) => {
  const {selectors, handlers} = useCreateInn({
    ...route.params?.data,
    navigation,
  });
  const {
    inn,
    loading,
    validation,
    deleteLoading,
    showDeleteConfirmModal,
  } = selectors;

  const {
    onCloseDeleteConfirmModal,
    onConfirmDelete,
    onCreateInn,
    onDeleteInn,
    onChangeName,
    onChangeType,
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
    onChangeCoordinate,
  } = handlers;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>{translate.innInfo}</Text>
      <Text types="h2">{translate.image}</Text>
      <ImagePicker
        quality={0.2}
        onChangeImages={onChangeImages}
        defaultImages={inn.images}
      />
      <CustomInput
        title={translate.post.innName}
        value={inn.innName}
        onChangeText={onChangeName}
        placeholder="Nhà trọ Như Ý"
        {...validation.name}
      />
      <BasePicker
        containerStyle={styles.marginTop}
        title="Loại trọ"
        items={typeInns}
        value={inn.type}
        setValue={onChangeType}
        required={true}
        titleStyle={styles.fontSize}
        textStyle={styles.fontSize}
      />
      <CityPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={inn.innCity}
        setValue={onChangeCity}
        required={true}
        {...validation.city}
      />
      <DistrictPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={inn.innDistrict}
        setValue={onChangeDistrict}
        cityId={inn.innCity}
        {...validation.district}
      />
      <CustomInput
        title={translate.post.innAddress}
        value={inn.innAddress}
        placeholder={translate.post.addressPlaceholder}
        onChangeText={onChangeAddress}
        {...validation.address}
      />
      <StatusPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={inn.innStatus}
        setValue={onChangeStatus}
      />
      <CustomInput
        title={translate.post.innPrice}
        value={`${inn.innPrice ?? ''}`}
        onChangeText={onChangePrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
        {...validation.price}
      />
      <CustomInput
        title={translate.post.innElectricPrice}
        value={`${inn.innElectricPrice ?? ''}`}
        onChangeText={onChangeElectricPrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <CustomInput
        title={translate.post.innWaterPrice}
        value={`${inn.innWaterPrice ?? ''}`}
        onChangeText={onChangeWaterPrice}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <CustomInput
        title={translate.post.innArea}
        value={`${inn.innArea ?? ''}`}
        onChangeText={onChangeArea}
        keyboardType="numeric"
      />
      <CustomInput
        title={translate.post.innDeposit}
        value={`${inn.innDeposit ?? ''}`}
        onChangeText={onChangeDeposit}
        keyboardType="numeric"
        placeholder={translate.placeholder.price}
      />
      <CustomInput
        title={translate.post.maxRoommate}
        value={`${inn.innMaxRoommate ?? ''}`}
        onChangeText={onChangeMaxRoommate}
        keyboardType="numeric"
      />

      <Text style={styles.sectionHeader}>{translate.ownerInfo}</Text>
      <CustomInput
        title={translate.post.innOwner}
        value={inn.innOwner}
        onChangeText={onChangeOwner}
      />
      <CustomInput
        title={translate.post.innContact}
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
      <CustomInput
        title={translate.post.attention}
        value={inn.innAttention}
        onChangeText={onChangeAttention}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />
      <CustomInput
        title={translate.post.notes}
        value={inn.innNotes}
        onChangeText={onChangeNotes}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />
      <View>
        <Text types="h2">Chọn vị trí</Text>
        <MapPicker
          mapStyle={styles.mapStyle}
          defaultValue={inn.coordinate}
          onPickPoint={onChangeCoordinate}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          loading={loading}
          title={translate.save}
          containerStyle={styles.buttonContainer}
          type="outline"
          disabled={deleteLoading}
          onPress={onCreateInn}
        />
        {route.params?.data && (
          <Button
            loading={deleteLoading}
            title="Xóa"
            containerStyle={styles.buttonDelete}
            titleStyle={styles.buttonDeleteTitle}
            buttonStyle={styles.buttonDeleteStyle}
            type="outline"
            onPress={onDeleteInn}
          />
        )}
      </View>
      <DeleteConfirm
        visible={showDeleteConfirmModal}
        onCancel={onCloseDeleteConfirmModal}
        onConfirm={onConfirmDelete}
        title="Bạn có chắc chắn xóa dữ liệu nhà trọ?"
        description="Dữ liệu sẽ bị xóa và không thể phục hồi"
      />
    </ScrollView>
  );
};

export default CreateInn;
