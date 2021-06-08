import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ROOMMATE_CREATE_POST} from '../../../store/actions/types';
import province from '../../../constants/provice.json';
import {formatString, unFormatString} from '../../../utils/utils';
import {selectUserInfo} from '../../login/selectors';
import {selectIsLoading} from '../selectors';

const usePostHook = ({navigation}) => {
  const [showInnInfo, setShowInnInfo] = useState(false);
  const [roommate, setRoommate] = useState({
    content: '',
    innName: null,
    innOwner: null,
    innPrice: null,
    innAddress: null,
    innWaterPrice: null,
    innElectricPrice: null,
    innArea: null,
    innDeposit: null,
    city: {
      Id: '79',
      Name: 'Thành phố Hồ Chí Minh',
    },
    district: {Id: '', Name: ''},
  });
  const [additionalInfo, setAdditionalInfo] = useState({
    job: 0,
    gender: 0,
    age: [20, 30],
  });
  const [districts, setDistricts] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const userInfo = useSelector(selectUserInfo);

  const handleSetRoommate = useCallback((value, field) => {
    setRoommate(preState => {
      return {
        ...preState,
        [field]: value,
      };
    });
  }, []);

  const onChangeShowInnInfo = useCallback(() => {
    setShowInnInfo(!showInnInfo);
  }, [showInnInfo]);

  const onContentChange = useCallback(
    text => {
      handleSetRoommate(text, 'content');
    },
    [handleSetRoommate],
  );

  const onInnNameChange = useCallback(
    text => {
      handleSetRoommate(text, 'innName');
    },
    [handleSetRoommate],
  );

  const onInnOwnerChange = useCallback(
    text => {
      handleSetRoommate(text, 'innOwner');
    },
    [handleSetRoommate],
  );

  const onInnPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innPrice');
      } else {
        handleSetRoommate(null, 'innPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnAddressChange = useCallback(
    text => {
      handleSetRoommate(text, 'innAddress');
    },
    [handleSetRoommate],
  );

  const onInnWaterPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innWaterPrice');
      } else {
        handleSetRoommate(null, 'innWaterPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnElectricPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innElectricPrice');
      } else {
        handleSetRoommate(null, 'innElectricPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnAreaChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innArea');
      } else {
        handleSetRoommate(null, 'innArea');
      }
    },
    [handleSetRoommate],
  );

  const onInnDepositChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innDeposit');
      } else {
        handleSetRoommate(null, 'innDeposit');
      }
    },
    [handleSetRoommate],
  );

  const onChangeCity = useCallback(
    value => {
      handleSetRoommate(
        {
          Id: value.key,
          Name: value.value,
        },
        'city',
      );
    },
    [handleSetRoommate],
  );

  const onChangeDistrict = useCallback(
    value => {
      handleSetRoommate(
        {
          Id: value.key,
          Name: value.value,
        },
        'district',
      );
    },
    [handleSetRoommate],
  );

  const onSelectJob = useCallback(value => {
    setAdditionalInfo(pre => ({
      ...pre,
      job: value,
    }));
  }, []);

  const onSelectGender = useCallback(value => {
    setAdditionalInfo(pre => ({
      ...pre,
      gender: value,
    }));
  }, []);

  const onAgeChange = useCallback(values => {
    setAdditionalInfo(pre => ({
      ...pre,
      age: values,
    }));
  }, []);

  const onPost = useCallback(async () => {
    let data = {
      content: roommate.content,
      haveInnContent: showInnInfo,
      isActive: true,
      district: roommate.district,
      city: roommate.city,
      ...additionalInfo,
    };
    if (showInnInfo) {
      data = {
        ...data,
        innName: roommate.innName,
        innOwner: roommate.innOwner,
        innPrice: unFormatString(roommate.innPrice, 'currency'),
        innAddress: roommate.innAddress,
        innWaterPrice: unFormatString(roommate.innWaterPrice, 'currency'),
        innElectricPrice: unFormatString(roommate.innElectricPrice, 'currency'),
        innArea: roommate.innArea,
        innDeposit: unFormatString(roommate.innDeposit, 'currency'),
      };
    }
    await handlePost(data);
    navigation.goBack();
  }, [navigation, roommate, additionalInfo, handlePost, showInnInfo]);

  useEffect(() => {
    if (!roommate.city.Id) {
      return;
    }

    setDistricts(
      province
        .find(item => item.Id === roommate.city.Id)
        .Districts.map(dt => {
          return {
            key: dt.Id,
            value: dt.Name,
          };
        }),
    );
  }, [roommate.city]);

  useEffect(() => {
    if (!districts.length) {
      return;
    }
    handleSetRoommate(districts[0], 'district');
  }, [districts, handleSetRoommate]);

  const handlePost = useCallback(
    async data => {
      dispatch({
        type: ROOMMATE_CREATE_POST,
        payload: {
          ...data,
          owner: {
            ...userInfo,
          },
        },
      });
    },
    [dispatch, userInfo],
  );

  return {
    handlers: {
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
    },
    selectors: {
      roommate,
      additionalInfo,
      showInnInfo,
      userInfo,
      isLoading,
      districts,
    },
  };
};

export default usePostHook;
