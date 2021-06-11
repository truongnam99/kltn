import React from 'react';
import {ScrollView, View} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';

import {
  Button,
  CheckBox,
  TextInput,
  BasePicker,
  Text,
} from '../../../components';
import {translate} from '../../../constants/translate';
import {gender, jobs} from '../../../constants/constants';
import usePost from '../hooks/usePost';
import {styles} from './post.style';
import {DeleteConfirm} from '../../../components/delete-confirm/delete-confirm';
import DistrictPicker from '../../../components/picker/district-picker';
import CityPicker from '../../../components/picker/city-picker';

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

const Post = ({route, navigation}) => {
  const {handlers, selectors} = usePost({
    data: {...route.params?.data},
    navigation,
  });
  const {
    showDeleteConfirmModal,
    roommate,
    loading,
    showInnInfo,
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
      <CustomInput
        value={roommate.content}
        multiline={true}
        style={styles.textContent}
        onChangeText={onContentChange}
      />
      <CityPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={roommate.city}
        setValue={onChangeCity}
      />
      <DistrictPicker
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
        value={roommate.district}
        setValue={onChangeDistrict}
        cityId={roommate.city}
      />
      <BasePicker
        title="Nghề nghiệp"
        items={jobs}
        value={roommate.job}
        setValue={onSelectJob}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
      />
      <BasePicker
        items={gender}
        value={roommate.gender}
        setValue={onSelectGender}
        title={translate.gender}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        textStyle={styles.fontSize}
      />
      <Text style={styles.fontSize}>
        Tuổi từ <Text types="bold">{roommate.age[0]}</Text> đến{' '}
        <Text types="bold">{roommate.age[1]}</Text>
      </Text>
      <Slider
        min={14}
        max={50}
        allowOverlap={false}
        values={[roommate.age[0], roommate.age[1]]}
        onValuesChange={onAgeChange}
        containerStyle={styles.sliderContainer}
        step={1}
      />

      <CheckBox
        types=""
        checked={showInnInfo}
        onChange={onChangeShowInnInfo}
        text={translate.post.innInfo}
        textStyle={styles.fontSize}
      />
      {showInnInfo && (
        <View>
          <CustomInput
            value={roommate.innName}
            title={translate.post.innName}
            onChangeText={onInnNameChange}
          />
          <CustomInput
            value={roommate.innOwner}
            title={translate.post.innOwner}
            onChangeText={onInnOwnerChange}
          />
          <CustomInput
            value={roommate.innPrice}
            title={translate.post.innPrice}
            onChangeText={onInnPriceChange}
            keyboardType="numeric"
          />
          <CustomInput
            value={roommate.innAddress}
            title={translate.post.innAddress}
            onChangeText={onInnAddressChange}
          />
          <CustomInput
            value={roommate.innWaterPrice}
            title={translate.post.innWaterPrice}
            onChangeText={onInnWaterPriceChange}
            keyboardType="numeric"
          />
          <CustomInput
            value={roommate.innElectricPrice}
            title={translate.post.innElectricPrice}
            onChangeText={onInnElectricPriceChange}
            keyboardType="numeric"
          />
          <CustomInput
            value={roommate.innArea}
            title={translate.post.innArea}
            onChangeText={onInnAreaChange}
            keyboardType="numeric"
          />
          <CustomInput
            value={roommate.innDeposit}
            title={translate.post.innDeposit}
            onChangeText={onInnDepositChange}
            keyboardType="numeric"
          />
        </View>
      )}
      <View style={styles.buttonWrapper}>
        <Button
          title={route.params?.data ? 'Cập nhật' : translate.post.post}
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
