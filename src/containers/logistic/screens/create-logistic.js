import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {
  Button,
  TextInput,
  CityPicker,
  DistrictPicker,
  ImagePicker,
  AreaPicker,
} from '../../../components';
import {DeleteConfirm} from '../../../components/delete-confirm/delete-confirm';
import {translate} from '../../../constants/translate';
import {useCreateLogistic} from '../hooks/useCreateLogistic';
import {styles} from './create-logistic.style';

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

const CreateLogistic = ({route, navigation}) => {
  const {selectors, handlers} = useCreateLogistic({
    data: {...route.params?.data},
    navigation,
  });
  const {
    logistic,
    loading,
    validation,
    deleteLoading,
    showDeleteConfirmModal,
  } = selectors;
  const {
    handleSetLogistic,
    onCreateLogistic,
    onDeleteLogistic,
    onConfirmDelete,
    onCloseDeleteConfirmModal,
  } = handlers;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>{translate.post.logisticInfo}</Text>
      <Text types="h2">{translate.image}</Text>
      <ImagePicker
        quality={0.2}
        onChangeImages={value => {
          handleSetLogistic('images', value);
        }}
        defaultImages={logistic.images}
        maxFile={1}
      />
      <CustomInput
        title={translate.post.logisticName}
        type="outline"
        value={logistic.name}
        onChangeText={value => handleSetLogistic('name', value)}
        {...validation.name}
      />
      <CityPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={logistic.city}
        setValue={value => handleSetLogistic('city', value())}
        {...validation.city}
      />
      <DistrictPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={logistic.district}
        setValue={value => handleSetLogistic('district', value())}
        cityId={logistic.city}
        {...validation.district}
      />
      <CustomInput
        title={translate.post.innAddress}
        type="outline"
        value={logistic.exactAddress}
        placeholder={translate.post.addressPlaceholder}
        onChangeText={value => handleSetLogistic('exactAddress', value)}
        {...validation.address}
      />
      <CustomInput
        title={translate.post.logisticPrice}
        type="outline"
        value={logistic.price}
        onChangeText={value => handleSetLogistic('price', value)}
        placeholder={translate.placeholder.price}
      />
      <AreaPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        tiltle="Khu vực hoạt động"
        onChangeValue={value => handleSetLogistic('area', value)}
        cityId={logistic.city}
      />

      <CustomInput
        title={translate.post.notes}
        type="outline"
        value={logistic.notes}
        onChangeText={value => handleSetLogistic('notes', value)}
        numberOfLines={5}
        multiline
        textInputStyle={styles.textAlign}
      />

      <Text style={styles.sectionHeader}>
        {translate.post.logisticOnwerInfo}
      </Text>
      <CustomInput
        title={translate.post.carOwner}
        type="outline"
        value={logistic.ownerName}
        onChangeText={value => handleSetLogistic('ownerName', value)}
      />
      <CustomInput
        title={translate.post.innContact}
        type="outline"
        value={logistic.contact}
        keyboardType="numeric"
        onChangeText={value => handleSetLogistic('contact', value)}
        placeholder={translate.placeholder.phone}
        {...validation.phoneNumber}
      />

      <View style={styles.buttonWrapper}>
        <Button
          loading={loading}
          title={translate.save}
          containerStyle={styles.buttonContainer}
          type="outline"
          disabled={deleteLoading}
          onPress={onCreateLogistic}
        />
        {route.params?.data && (
          <Button
            loading={deleteLoading}
            title="Xóa"
            containerStyle={styles.buttonDelete}
            titleStyle={styles.buttonDeleteTitle}
            buttonStyle={styles.buttonDeleteStyle}
            type="outline"
            onPress={onDeleteLogistic}
          />
        )}
      </View>
      <DeleteConfirm
        visible={showDeleteConfirmModal}
        onCancel={onCloseDeleteConfirmModal}
        onConfirm={onConfirmDelete}
        title="Bạn có chắc chắn xóa dữ dịch vụ vận chuyển?"
        description="Dữ liệu sẽ bị xóa và không thể phục hồi"
      />
    </ScrollView>
  );
};

export default CreateLogistic;
