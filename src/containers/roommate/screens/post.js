import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import Slider from '@ptomasroos/react-native-multi-slider';
import {translate} from '../../../constants/translate';
import {gender, jobs} from '../../../constants/constants';
import {
  Button,
  CheckBox,
  TextInput as CustomTextInput,
  Picker,
  BasePicker,
  Text,
} from '../../../components';
import {styles} from './post.style';
import province from '../../../constants/provice.json';
import usePostHook from '../hooks/usePostHook';
import {formatString, unFormatString} from '../../../utils/utils';

const Post = ({navigation}) => {
  const [showInnInfo, setShowInnInfo] = useState(false);
  const [content, setContent] = useState('');
  const [innName, setInnName] = useState(null);
  const [innOwner, setInnOwner] = useState(null);
  const [innPrice, setInnPrice] = useState(null);
  const [innAddress, setInnAddress] = useState(null);
  const [innWaterPrice, setInnWaterPrice] = useState(null);
  const [innElectricPrice, setInnElectricPrice] = useState(null);
  const [innArea, setInnArea] = useState(null);
  const [innDeposit, setInnDeposit] = useState(null);
  const [city, setCity] = useState({
    Id: '79',
    Name: 'Thành phố Hồ Chí Minh',
  });
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({Id: '', Name: ''});
  const [additionalInfo, setAdditionalInfo] = useState({
    job: 0,
    gender: 0,
    age: [20, 30],
  });
  const {handlers, selectors} = usePostHook();
  const {isLoading} = selectors;
  const {handlePost} = handlers;

  const onChangeShowInnInfo = () => {
    setShowInnInfo(!showInnInfo);
  };

  const onContentChange = text => {
    setContent(text);
  };
  const onInnNameChange = text => {
    setInnName(text);
  };
  const onInnOwnerChange = text => {
    setInnOwner(text);
  };
  const onInnPriceChange = text => {
    if (text !== '') {
      setInnPrice(formatString(text, 'currency'));
    } else {
      setInnPrice(null);
    }
  };
  const onInnAddressChange = text => {
    setInnAddress(text);
  };
  const onInnWaterPriceChange = text => {
    if (text !== '') {
      setInnWaterPrice(formatString(text, 'currency'));
    } else {
      setInnWaterPrice(null);
    }
  };
  const onInnElectricPriceChange = text => {
    if (text !== '') {
      setInnElectricPrice(formatString(text, 'currency'));
    } else {
      setInnElectricPrice(null);
    }
  };
  const onInnAreaChange = text => {
    if (text !== '') {
      setInnArea(formatString(text, 'currency'));
    } else {
      setInnArea(null);
    }
  };
  const onInnDepositChange = text => {
    if (text !== '') {
      setInnDeposit(formatString(text, 'currency'));
    } else {
      setInnDeposit(null);
    }
  };

  const onPost = async () => {
    let data = {
      content: content,
      haveInnContent: showInnInfo,
      isActive: true,
      district,
      city,
      ...additionalInfo,
    };
    if (showInnInfo) {
      data = {
        ...data,
        innName: innName,
        innOwner: innOwner,
        innPrice: unFormatString(innPrice, 'currency'),
        innAddress: innAddress,
        innWaterPrice: unFormatString(innWaterPrice, 'currency'),
        innElectricPrice: unFormatString(innElectricPrice, 'currency'),
        innArea: innArea,
        innDeposit: unFormatString(innDeposit, 'currency'),
      };
    }
    await handlePost(data);
    navigation.goBack();
  };

  const onChangeCity = value => {
    setCity({
      Id: value.key,
      Name: value.value,
    });
  };

  const onChangeDistrict = value => {
    setDistrict({
      Id: value.key,
      Name: value.value,
    });
  };

  const onSelectJob = value => {
    setAdditionalInfo(pre => ({
      ...pre,
      job: value,
    }));
  };

  const onSelectGender = value => {
    setAdditionalInfo(pre => ({
      ...pre,
      gender: value,
    }));
  };

  const onAgeChange = values => {
    setAdditionalInfo(pre => ({
      ...pre,
      age: values,
    }));
  };

  useEffect(() => {
    if (!city.Id) {
      return;
    }

    setDistricts(
      province
        .find(item => item.Id === city.Id)
        .Districts.map(dt => {
          return {
            key: dt.Id,
            value: dt.Name,
          };
        }),
    );
  }, [city]);

  useEffect(() => {
    if (!districts.length) {
      return;
    }
    setDistrict(districts[0]);
  }, [districts]);

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
        value={{key: city.Id, value: city.Name}}
        onChange={onChangeCity}
      />

      <Text>{translate.district}</Text>
      <Picker
        items={districts}
        value={{value: district.Name}}
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
