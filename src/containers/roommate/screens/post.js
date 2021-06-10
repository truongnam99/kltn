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
import {DeleteConfirm} from '../../../components/delete-confirm/delete-confirm';

const Post = ({route, navigation}) => {
  const {handlers, selectors} = usePost({
    data: {...route.params?.data},
    navigation,
  });
  const {
    showDeleteConfirmModal,
    roommate,
    additionalInfo,
    loading,
    showInnInfo,
    districts,
    deleteLoading,
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
    onDeleteRoommate,
    onCloseDeleteConfirmModal,
    onConfirmDelete,
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
      <View style={styles.buttonWrapper}>
        <Button
          title={translate.post.post}
          loading={loading}
          containerStyle={styles.buttonContainer}
          type="outline"
          disabled={deleteLoading}
          onPress={onPost}
        />
        {route.params?.data && (
          <Button
            loading={deleteLoading}
            title="Xóa"
            containerStyle={styles.buttonDelete}
            titleStyle={styles.buttonDeleteTitle}
            buttonStyle={styles.buttonDeleteStyle}
            type="outline"
            onPress={onDeleteRoommate}
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

export default Post;
