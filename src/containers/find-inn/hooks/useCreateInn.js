import {useCallback, useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';

import {createInn, deleteInn} from '../../../store/actions/innAction';
import {
  formatString,
  getCity,
  isPhoneNumber,
  showMessageFail,
  unFormatString,
} from '../../../utils/utils';
import {selectCreateInnStatus, selectDeleteInnStatus} from '../selectors';
import {selectUserInfo} from '../../login/selectors';
import {uploadImagesToFirebase} from '../../../service/firebaseService';
import {status} from '../../../constants/constants';

export const useCreateInn = ({data = {}, navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const {status: createInnStatus} = useSelector(selectCreateInnStatus);
  const {status: deleteInnStatus} = useSelector(selectDeleteInnStatus);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
    innDeposit: formatString(data.deposit, 'currency'),
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
    coordinate: data.coordinate || null,
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
        if (!focused && newValidation[error]?.inputRef?.current) {
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

  const onCreateInn = async () => {
    const result = await handleCreateInn();
    if (result) {
      navigation.goBack();
    }
  };

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
      hanleChangeInn(value(), 'innStatus');
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

  const onChangeCoordinate = useCallback(
    value => {
      hanleChangeInn(value, 'coordinate');
    },
    [hanleChangeInn],
  );

  const uploadImage = async () => {
    try {
      return await uploadImagesToFirebase(inn.images.map(image => image.uri));
    } catch (error) {
      throw new Error('ERR_UPLOAD_IMAGE');
    }
  };

  const handleCreateInn = async () => {
    let check = false;
    try {
      if (!validateData()) {
        throw new Error('ERR_VALIDATE_DATA');
      }
      const city = getCity(inn.innCity);
      const upload_room_images = await uploadImage();
      console.log('upload_room_images: ', upload_room_images);

      const district = city.Districts?.find(
        item => item.Id === inn.innDistrict,
      );
      const payload = {
        ...data,
        room_name: inn.innName,
        room_owner: inn.innOwner,
        created_by: userInfo || data.created_by,
        available_status: inn.innStatus,
        room_price: unFormatString(inn.innPrice, 'currency'),
        exact_room_address: inn.innAddress,
        electric_price: unFormatString(inn.innElectricPrice, 'currency'),
        water_price: unFormatString(inn.innWaterPrice, 'currency'),
        room_area: numeral(inn.innArea).value(),
        deposit: unFormatString(inn.innDeposit, 'currency'),
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
        coordinate: inn.coordinate,
      };
      dispatch(createInn(payload));
      check = true;
    } catch (error) {
      switch (error.message) {
        case 'ERR_UPLOAD_IMAGE':
          showMessageFail('Lỗi đăng hình ảnh.');
          break;

        case 'ERR_VALIDATE_DATA':
          showMessageFail('Vui lòng điền đầy đủ thông tin.');
          break;
        default:
          console.log('need handle error at handleCreateInn', error);
          break;
      }
      check = false;
    } finally {
      return check;
    }
  };

  const onDeleteInn = useCallback(() => {
    setShowDeleteConfirmModal(true);
  }, []);

  const onCloseDeleteConfirmModal = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const onConfirmDelete = useCallback(() => {
    try {
      setShowDeleteConfirmModal(false);
      dispatch(deleteInn(data.uid));
    } finally {
      navigation.goBack();
    }
  }, [dispatch, data, navigation]);
  useEffect(() => {
    if (createInnStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [createInnStatus]);

  useEffect(() => {
    if (deleteInnStatus === status.PENDING) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);
    }
  }, [deleteInnStatus]);

  return {
    handlers: {
      onCreateInn,
      onDeleteInn,
      onCloseDeleteConfirmModal,
      onConfirmDelete,
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
      onChangeCoordinate,
    },
    selectors: {
      inn,
      loading,
      deleteLoading,
      validation,
      showDeleteConfirmModal,
    },
  };
};
