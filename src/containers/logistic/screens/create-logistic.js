import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {
  Button,
  TextInput,
  CityPicker,
  DistrictPicker,
  ImagePicker,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {useCreateLogistic} from '../hooks/useCreateLogistic';
import {styles} from './create-logistic.style';

const CreateLogistic = ({route, navigation}) => {
  const {selectors, handlers} = useCreateLogistic({...route.params?.data});
  const {logistic, isLoading, validation} = selectors;

  const {handleSetLogistic, handlerCreateLogistic} = handlers;

  const onCreateLogistic = async () => {
    const result = await handlerCreateLogistic();
    if (result) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>{translate.post.logisticInfo}</Text>
      <Text>{translate.image}</Text>
      <ImagePicker
        quality={0.2}
        onChangeImages={value => handleSetLogistic('images', value)}
        defaultImages={logistic.images}
        maxFile={1}
      />
      <TextInput
        title={translate.post.logisticName}
        type="outline"
        value={logistic.name}
        onChangeText={value => handleSetLogistic('name', value)}
        {...validation.name}
      />
      <CityPicker
        value={logistic.city}
        setValue={value => handleSetLogistic('city', value())}
        {...validation.city}
      />
      <DistrictPicker
        value={logistic.district}
        setValue={value => handleSetLogistic('district', value())}
        cityId={logistic.city}
        {...validation.district}
      />
      <TextInput
        title={translate.post.innAddress}
        type="outline"
        value={logistic.exactAddress}
        placeholder={translate.post.addressPlaceholder}
        onChangeText={value => handleSetLogistic('exactAddress', value)}
        {...validation.address}
      />
      <TextInput
        title={translate.post.logisticPrice}
        type="outline"
        value={logistic.price}
        onChangeText={value => handleSetLogistic('price', value)}
        placeholder={translate.placeholder.price}
      />
      <TextInput
        title={translate.post.logisticArea}
        type="outline"
        value={logistic.area}
        onChangeText={value => handleSetLogistic('area', value)}
        placeholder={translate.placeholder.price}
      />

      <TextInput
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
      <TextInput
        title={translate.post.carOwner}
        type="outline"
        value={logistic.ownerName}
        onChangeText={value => handleSetLogistic('ownerName', value)}
      />
      <TextInput
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
          loading={isLoading}
          title={translate.save}
          containerStyle={styles.buttonContainer}
          type="outline"
          onPress={onCreateLogistic}
        />
      </View>
    </ScrollView>
  );
};

export default CreateLogistic;
