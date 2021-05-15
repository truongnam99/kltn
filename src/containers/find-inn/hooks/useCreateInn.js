import React, {useCallback, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  formatString,
  getCity,
  isPhoneNumber,
  unFormatString,
  uploadImageIntoFirebase,
} from '../../../utils/utils';
import {createInn, setLoading} from '../../../store/actions/innAction';
import numeral from 'numeral';

export const useCreateInn = ({data = {}}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const isLoading = useSelector(state => state.innReducer.isLoading);
  const [inn, setInn] = useState({
    images: data.upload_room_images?.map(item => ({uri: item})) || [],
    innName: data.room_name,
    innOwner: userInfo?.displayName,
    innStatus: data.available_status || 1,
    innPrice: formatString(data.room_price, 'currency'),
    innAddress: data.exact_room_address,
    innElectricPrice: formatString(data.electric_price, 'currency'),
    innWaterPrice: formatString(data.water_price, 'currency'),
    innArea: data.room_area,
    innDeposit: data.deposit,
    innWifi: data.room_wifi,
    innGarage: data.parking_situation,
    innDistrict: data.full_address_object?.district.code,
    innCity: data.full_address_object?.city.code || '79',
    innContact: formatString(
      data.phone_number || userInfo?.phoneNumber,
      'phoneNumber',
    ),
    innMaxRoommate: data.max_roommate,
    innAttention: data.attention,
    innNotes: data.notes,
    roomBed: data.room_bed || false,
    roomCloset: data.room_closet || false,
    roomKetchen: data.room_ketchen || false,
    roomPetsAllowed: data.room_pets_allowed || false,
    roomTivi: data.room_tivi || false,
    roomRefrigerator: data.room_refrigerator || false,
    roomWashingMachine: data.room_washing_machine || false,
    roomAirConditioner: data.air_conditioner || false,
  });

  const [validation, setValidation] = useState({
    name: {
      required: true,
      hint: 'Tên không được trống',
      showHint: false,
      inputRef: useRef(),
      error: false,
    },
    city: {
      required: true,
      error: false,
    },
    district: {
      required: true,
      error: false,
    },
    address: {
      required: true,
      error: false,
      hint: 'Địa chỉ không được trống',
      showHint: false,
      inputRef: useRef(),
    },
    price: {
      required: true,
      error: false,
      hint: 'Giá không được trống',
      showHint: false,
      inputRef: useRef(),
    },
    phoneNumber: {
      error: false,
      hint: 'Số điện thoại không đúng',
      inputRef: useRef(),
    },
  });

  const validateField = useCallback(
    (value, field) => {
      const check =
        field !== 'phoneNumber'
          ? !!value
          : !!isPhoneNumber(unFormatString(value, 'phoneNumber'));
      if (check) {
        setValidation(preState => {
          const newValidation = {
            ...preState,
            [field]: {
              ...preState[field],
              showHint: false,
              error: false,
            },
          };
          return {...newValidation};
        });
      } else {
        setValidation(preState => {
          const newValidation = {
            ...preState,
            [field]: {
              ...preState[field],
              showHint: true,
              error: true,
            },
          };
          return {...newValidation};
        });
      }
    },
    [setValidation],
  );

  const validateData = () => {
    const errors = [];
    if (!inn.innName) {
      errors.push('name');
    }
    if (!inn.innDistrict) {
      errors.push('district');
    }
    if (!inn.innAddress) {
      errors.push('address');
    }
    if (!inn.innPrice) {
      errors.push('price');
    }
    if (!isPhoneNumber(unFormatString(inn.innContact, 'phoneNumber'))) {
      errors.push('phoneNumber');
    }

    setValidation(preState => {
      const newValidation = {...preState};
      let focused = false;
      Object.keys(newValidation).forEach(item => {
        newValidation[item] = {
          ...newValidation[item],
          showHint: false,
          error: false,
        };
      });
      errors.forEach(error => {
        newValidation[error] = {
          ...newValidation[error],
          showHint: true,
          error: true,
          validate: value => validateField(value, error),
        };
        if (focused && newValidation[error]?.inputRef?.current) {
          focused = true;
          newValidation[error]?.inputRef?.current.focus();
        }
      });
      return {...newValidation};
    });
    return !errors.length;
  };

  const hanleChangeInn = useCallback(
    (value, field) => {
      setInn(preState => ({
        ...preState,
        [field]: value,
      }));
    },
    [setInn],
  );

  const onChangeName = useCallback(
    value => {
      hanleChangeInn(value, 'innName');
    },
    [hanleChangeInn],
  );

  const onChangeAddress = useCallback(
    value => {
      hanleChangeInn(value, 'innAddress');
    },
    [hanleChangeInn],
  );

  const onChangeImages = useCallback(
    value => {
      hanleChangeInn(value, 'images');
    },
    [hanleChangeInn],
  );
  const onChangeCity = useCallback(
    value => {
      hanleChangeInn(value(), 'innCity');
    },
    [hanleChangeInn],
  );
  const onChangeDistrict = useCallback(
    value => {
      hanleChangeInn(value(), 'innDistrict');
    },
    [hanleChangeInn],
  );
  const onChangeStatus = useCallback(
    value => {
      hanleChangeInn(value, 'innStatus');
    },
    [hanleChangeInn],
  );
  const onChangePrice = useCallback(
    value => {
      hanleChangeInn(formatString(value, 'currency'), 'innPrice');
    },
    [hanleChangeInn],
  );
  const onChangeElectricPrice = useCallback(
    value => {
      hanleChangeInn(formatString(value, 'currency'), 'innElectricPrice');
    },
    [hanleChangeInn],
  );
  const onChangeWaterPrice = useCallback(
    value => {
      hanleChangeInn(
        hanleChangeInn(formatString(value, 'currency'), 'innWaterPrice'),
      );
    },
    [hanleChangeInn],
  );
  const onChangeArea = useCallback(
    value => {
      hanleChangeInn(value, 'innArea');
    },
    [hanleChangeInn],
  );
  const onChangeDeposit = useCallback(
    value => {
      hanleChangeInn(formatString(value, 'currency'), 'innDeposit');
    },
    [hanleChangeInn],
  );
  const onChangeMaxRoommate = useCallback(
    value => {
      hanleChangeInn(value, 'innMaxRoommate');
    },
    [hanleChangeInn],
  );
  const onChangeOwner = useCallback(
    value => {
      hanleChangeInn(value, 'innOwner');
    },
    [hanleChangeInn],
  );
  const onChangeContact = useCallback(
    value => {
      hanleChangeInn(formatString(value, 'phoneNumber'), 'innContact');
    },
    [hanleChangeInn],
  );
  const onChangeWifi = useCallback(
    value => {
      hanleChangeInn(value, 'innWifi');
    },
    [hanleChangeInn],
  );
  const onChangeGarage = useCallback(
    value => {
      hanleChangeInn(value, 'innGarage');
    },
    [hanleChangeInn],
  );
  const onChangeRoomBed = useCallback(
    value => {
      hanleChangeInn(value, 'roomBed');
    },
    [hanleChangeInn],
  );
  const onChangeRoomCloset = useCallback(
    value => {
      hanleChangeInn(value, 'roomCloset');
    },
    [hanleChangeInn],
  );
  const onChangeRoomKetchen = useCallback(
    value => {
      hanleChangeInn(value, 'roomKetchen');
    },
    [hanleChangeInn],
  );
  const onChangeRoomPetsAllowed = useCallback(
    value => {
      hanleChangeInn(value, 'roomPetsAllowed');
    },
    [hanleChangeInn],
  );
  const onChangeRoomRefrigerator = useCallback(
    value => {
      hanleChangeInn(value, 'roomRefrigerator');
    },
    [hanleChangeInn],
  );
  const onChangeRoomAirConditioner = useCallback(
    value => {
      hanleChangeInn(value, 'roomAirConditioner');
    },
    [hanleChangeInn],
  );
  const onChangeRoomTivi = useCallback(
    value => {
      hanleChangeInn(value, 'roomTivi');
    },
    [hanleChangeInn],
  );
  const onChangeRoomWashingMachine = useCallback(
    value => {
      hanleChangeInn(value, 'roomWashingMachine');
    },
    [hanleChangeInn],
  );
  const onChangeAttention = useCallback(
    value => {
      hanleChangeInn(value, 'innAttention');
    },
    [hanleChangeInn],
  );
  const onChangeNotes = useCallback(
    value => {
      hanleChangeInn(value, 'innNotes');
    },
    [hanleChangeInn],
  );

  const uploadImage = async () => {
    const img = [];
    for (let i = 0; i < inn.images.length; i++) {
      if (inn.images[i].uri.startsWith('http')) {
        img.push(inn.images[i].uri);
        continue;
      }
      const result = await uploadImageIntoFirebase(inn.images[i].uri);
      img.push(await result.getDownloadURL());
    }
    return img;
  };

  const handleCreateInn = async () => {
    if (!validateData()) {
      return false;
    }
    try {
      dispatch(setLoading(true));
      const city = getCity(inn.innCity);
      const upload_room_images = await uploadImage();
      const district = city.Districts?.find(
        item => item.Id === inn.innDistrict,
      );
      const payload = {
        ...data,
        room_name: inn.innName,
        room_owner: inn.innOwner,
        created_by: userInfo || data.created_by,
        available_status: inn.innStatus,
        room_price: numeral(unFormatString(inn.innPrice, 'currency')).value(),
        exact_room_address: inn.innAddress,
        electric_price: numeral(
          unFormatString(inn.innElectricPrice, 'currency'),
        ).value(),
        water_price: numeral(
          unFormatString(inn.innWaterPrice, 'currency'),
        ).value(),
        room_area: numeral(inn.innArea).value(),
        deposit: numeral(inn.innDeposit).value(),
        room_wifi: inn.innWifi,
        parking_situation: inn.innGarage,
        full_address_object: {
          city: {
            code: city.Id,
            text: city.Name,
          },
          district: {
            code: district.Id,
            text: district.Name,
          },
        },
        phone_number: unFormatString(inn.innContact, 'phoneNumber'),
        max_roommate: numeral(inn.innMaxRoommate).value(),
        attention: inn.innAttention,
        notes: inn.innNotes,
        room_bed: inn.roomBed,
        room_closet: inn.roomCloset,
        room_ketchen: inn.roomKetchen,
        room_pets_allowed: inn.roomPetsAllowed,
        room_tivi: inn.roomTivi,
        room_refrigerator: inn.roomRefrigerator,
        air_conditioner: inn.roomAirConditioner,
        room_washing_machine: inn.roomWashingMachine,
        upload_room_images,
      };
      dispatch(createInn(payload));
    } catch (error) {
      console.log('need handle error at handleCreateInn', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handlers: {
      handleCreateInn,
      hanleChangeInn,
      onChangeName,
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
    },
    selectors: {
      inn,
      isLoading: isLoading,
      validation,
    },
  };
};
