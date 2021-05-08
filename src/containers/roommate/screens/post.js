import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TextInput, View} from 'react-native';
import {translate} from '../../../constants/translate';
import {
  Button,
  CheckBox,
  TextInput as CustomTextInput,
  Picker,
} from '../../../components';
import {styles} from './post.style';
import useHook from '../hooks';
import province from '../../../constants/provice.json';

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

  const {handlers} = useHook();
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
      setInnPrice(+text);
    } else {
      setInnPrice(null);
    }
  };
  const onInnAddressChange = text => {
    setInnAddress(text);
  };
  const onInnWaterPriceChange = text => {
    if (text !== '') {
      setInnWaterPrice(+text);
    } else {
      setInnWaterPrice(null);
    }
  };
  const onInnElectricPriceChange = text => {
    if (text !== '') {
      setInnElectricPrice(+text);
    } else {
      setInnElectricPrice(null);
    }
  };
  const onInnAreaChange = text => {
    if (text !== '') {
      setInnArea(+text);
    } else {
      setInnArea(null);
    }
  };
  const onInnDepositChange = text => {
    if (text !== '') {
      setInnDeposit(+text);
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
    };
    if (showInnInfo) {
      data = {
        ...data,
        innName: innName,
        innOwner: innOwner,
        innPrice: innPrice,
        innAddress: innAddress,
        innWaterPrice: innWaterPrice,
        innElectricPrice: innElectricPrice,
        innArea: innArea,
        innDeposit: innDeposit,
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
        containerStyle={styles.button}
        title={translate.post.post}
        onPress={onPost}
      />
    </ScrollView>
  );
};

export default Post;
