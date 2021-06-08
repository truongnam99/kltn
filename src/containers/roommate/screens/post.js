import React from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';

import {
  Button,
  CheckBox,
  TextInput as CustomTextInput,
  Picker,
  BasePicker,
  Text,
} from '../../../components';
import province from '../../../constants/provice.json';
import {translate} from '../../../constants/translate';
import {gender, jobs} from '../../../constants/constants';
import usePost from '../hooks/usePost';
import {styles} from './post.style';

const Post = ({navigation}) => {
  const {handlers, selectors} = usePost({navigation});
  const {
    roommate,
    additionalInfo,
    isLoading,
    showInnInfo,
    districts,
  } = selectors;
  const {
    onContentChange,
    onChangeCity,
    onChangeDistrict,
    onSelectJob,
    onSelectGender,
    onAgeChange,
    onChangeShowInnInfo,
    onInnNameChange,
    onInnOwnerChange,
    onInnPriceChange,
    onInnAddressChange,
    onInnWaterPriceChange,
    onInnElectricPriceChange,
    onInnAreaChange,
    onInnDepositChange,
    onPost,
  } = handlers;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{translate.roommate.contentTitle}</Text>
      <TextInput
        multiline={true}
        style={styles.textContent}
        onChangeText={onContentChange}
      />
      <Text>{translate.city}</Text>
      <Picker
        items={province.map(item => {
          return {
            key: item.Id,
            value: item.Name,
          };
        })}
        value={{key: roommate.city.Id, value: roommate.city.Name}}
        onChange={onChangeCity}
      />

      <Text>{translate.district}</Text>
      <Picker
        items={districts}
        value={{value: roommate.district.Name}}
        onChange={onChangeDistrict}
      />
      <BasePicker
        items={jobs}
        value={additionalInfo.job}
        setValue={onSelectJob}
      />
      <BasePicker
        items={gender}
        value={additionalInfo.gender}
        setValue={onSelectGender}
        title={translate.gender}
      />
      <Text>{translate.age}</Text>
      <Text>
        Tuổi từ <Text style={styles.priceStyle}>{additionalInfo.age[0]}</Text>{' '}
        đến <Text style={styles.priceStyle}>{additionalInfo.age[1]}</Text>
      </Text>
      <Slider
        min={14}
        max={50}
        allowOverlap={false}
        values={[additionalInfo.age[0], additionalInfo.age[1]]}
        onValuesChange={onAgeChange}
        containerStyle={styles.sliderContainer}
        step={1}
      />

      <CheckBox
        types=""
        checked={showInnInfo}
        onChange={onChangeShowInnInfo}
        text={translate.post.innInfo}
      />
      {showInnInfo && (
        <View>
          <CustomTextInput
            title={translate.post.innName}
            onChangeText={onInnNameChange}
          />
          <CustomTextInput
            title={translate.post.innOwner}
            onChangeText={onInnOwnerChange}
          />
          <CustomTextInput
            title={translate.post.innPrice}
            onChangeText={onInnPriceChange}
            keyboardType="numeric"
          />
          <CustomTextInput
            title={translate.post.innAddress}
            onChangeText={onInnAddressChange}
          />
          <CustomTextInput
            title={translate.post.innWaterPrice}
            onChangeText={onInnWaterPriceChange}
            keyboardType="numeric"
          />
          <CustomTextInput
            title={translate.post.innElectricPrice}
            onChangeText={onInnElectricPriceChange}
            keyboardType="numeric"
          />
          <CustomTextInput
            title={translate.post.innArea}
            onChangeText={onInnAreaChange}
            keyboardType="numeric"
          />
          <CustomTextInput
            title={translate.post.innDeposit}
            onChangeText={onInnDepositChange}
            keyboardType="numeric"
          />
        </View>
      )}
      <Button
        loading={isLoading}
        containerStyle={styles.button}
        title={translate.post.post}
        onPress={onPost}
      />
    </ScrollView>
  );
};

export default Post;
