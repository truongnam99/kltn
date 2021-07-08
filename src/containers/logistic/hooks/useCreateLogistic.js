import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  createLogistic,
  deleteLogistic,
  resetCreateLogisticStatus,
  resetDeleteLogisticStatus,
  resetUpdateLogisticStatus,
  updateLogistic,
} from '../../../store/actions/logisticAction';
import {
  formatString,
  getCity,
  unFormatString,
  isPhoneNumber,
  showMessageFail,
} from '../../../utils/utils';
import {status} from '../../../constants/constants';
import {selectUserInfo} from '../../login/selectors';
import {
  selectCreateLogisticStatus,
  selectDeleteLogisticStatus,
  selectUpdateLogisticStatus,
} from '../selectors';
import {navigationName} from '../../../constants/navigation';

export const useCreateLogistic = ({data = {}, navigation}) => {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const {status: createLogisticStatus} = useSelector(
    selectCreateLogisticStatus,
  );
  const {status: deleteLogisticStatus} = useSelector(
    selectDeleteLogisticStatus,
  );
  const {status: updateLogisticStatus} = useSelector(
    selectUpdateLogisticStatus,
  );
  const dispatch = useDispatch();
  const [logistic, setLogistic] = useState({
    id: data.id,
    name: data.name,
    owner: data.owner || {
      displayName: userInfo.displayName,
      phoneNumber: unFormatString(userInfo.phoneNumber, 'phoneNumber'),
      photoURL: userInfo.photoURL,
      uid: userInfo.uid,
    },
    images: data.image ? [{uri: data.image}] : [],
    area: data.area || [],
    exactAddress: data.exact_address,
    price: data.price,
    city: data.full_address_object?.city.Id || '79',
    district: data.full_address_object?.district.Id,
    ownerName: data.ownerName || userInfo.displayName,
    contact: formatString(data.contact || userInfo.phoneNumber, 'phoneNumber'),
    notes: data.notes,
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
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (
      createLogisticStatus === status.PENDING ||
      updateLogisticStatus === status.PENDING
    ) {
      setLoading(true);
    } else {
      setLoading(false);
      if (createLogisticStatus === status.SUCCESS) {
        dispatch(resetCreateLogisticStatus());
        navigation.goBack(navigationName.logistic.logistic);
      }
      if (updateLogisticStatus === status.SUCCESS) {
        dispatch(resetUpdateLogisticStatus());
        navigation.goBack(navigationName.logistic.myLogistic);
      }
    }
  }, [navigation, createLogisticStatus, updateLogisticStatus, dispatch]);

  useEffect(() => {
    if (deleteLogisticStatus === status.PENDING) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);
      if (deleteLogisticStatus === status.SUCCESS) {
        dispatch(resetDeleteLogisticStatus());
        navigation.goBack(navigationName.logistic.myLogistic);
      }
    }
  }, [navigation, deleteLogisticStatus, dispatch]);

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

  const validateData = useCallback(() => {
    const errors = [];
    if (!logistic.name) {
      errors.push('name');
    }
    if (!logistic.district) {
      errors.push('district');
    }
    if (!logistic.exactAddress) {
      errors.push('address');
    }
    if (!logistic.exactAddress) {
      errors.push('price');
    }
    if (!isPhoneNumber(unFormatString(logistic.contact, 'phoneNumber'))) {
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
        if (!focused && newValidation[error].inputRef?.current) {
          focused = true;
          newValidation[error]?.inputRef?.current.focus();
        }
      });
      return {...newValidation};
    });
    return !errors.length;
  }, [logistic, validateField]);

  const handleSetLogistic = useCallback(
    (field, value) => {
      setLogistic(prev => {
        return {
          ...prev,
          [field]: value,
        };
      });
    },
    [setLogistic],
  );

  const getCityAndDistrict = useCallback(() => {
    const city = getCity(logistic.city);
    const district =
      !!city && city.Districts.find(item => item.Id === logistic.district);
    return {
      city: city
        ? {
            Id: city.Id,
            Name: city.Name,
          }
        : null,
      district: district
        ? {
            Id: district.Id,
            Name: district.Name,
          }
        : null,
    };
  }, [logistic.city, logistic.district]);

  const handleCreateLogistic = useCallback(async () => {
    try {
      if (!validateData()) {
        throw new Error('ERR_VALIDATE_DATA');
      }
      const {city, district} = getCityAndDistrict();
      const {exactAddress, images, ...rest} = logistic;
      const payload = {
        ...rest,
        exact_address: exactAddress,
        full_address_object: {
          city,
          district,
        },
        image: images[0]?.uri,
        contact: unFormatString(rest.contact, 'phoneNumber'),
      };
      if (payload.id) {
        dispatch(updateLogistic(payload));
      } else {
        dispatch(createLogistic(payload));
      }
    } catch (error) {
      switch (error.message) {
        case 'ERR_VALIDATE_DATA':
          showMessageFail('Vui lòng nhập đầy đủ thông tin');
          break;
        case 'ERR_UPLOAD_IMAGE':
          showMessageFail('Lỗi đăng hình ảnh.');
          break;
        default:
          console.log('need to handle error at handleCreateLogistic', error);
          break;
      }
    }
  }, [logistic, getCityAndDistrict, validateData, dispatch]);

  const onCreateLogistic = useCallback(() => {
    handleCreateLogistic();
  }, [handleCreateLogistic]);

  const onDeleteLogistic = useCallback(() => {
    setShowDeleteConfirmModal(true);
  }, []);

  const onCloseDeleteConfirmModal = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const onConfirmDelete = useCallback(() => {
    setShowDeleteConfirmModal(false);
    dispatch(deleteLogistic(data.id));
  }, [dispatch, data]);

  return {
    handlers: {
      handleSetLogistic,
      handleCreateLogistic,
      onCreateLogistic,
      onDeleteLogistic,
      onCloseDeleteConfirmModal,
      onConfirmDelete,
    },
    selectors: {
      logistic,
      deleteLoading,
      loading,
      validation,
      showDeleteConfirmModal,
    },
  };
};
