import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  createLogistic,
  setLoading,
} from '../../../store/actions/logisticAction';
import {
  formatString,
  getCity,
  uploadImageIntoFirebase,
  unFormatString,
  isPhoneNumber,
} from '../../../utils/utils';

export const useCreateLogistic = (data = {}) => {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const isLoading = useSelector(state => state.logisticReducer.isLoading);
  const dispatch = useDispatch();
  const [logistic, setLogistic] = useState({
    id: data.id,
    name: data.name,
    owner: data.owner,
    images: data.image ? [{uri: data.image}] : [],
    area: data.area,
    exactAddress: data.exact_address,
    price: formatString(data.price, 'currency'),
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
  };

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

  const getCityAndDistrict = () => {
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
  };

  const uploadImage = async () => {
    const img = [];
    for (let i = 0; i < logistic.images.length; i++) {
      if (logistic.images[i].uri.startsWith('http')) {
        img.push(logistic.images[i].uri);
        continue;
      }
      const result = await uploadImageIntoFirebase(logistic.images[i].uri);
      img.push(await result.getDownloadURL());
    }
    return img;
  };

  const handlerCreateLogistic = async () => {
    let check = false;
    try {
      if (!validateData()) {
        return false;
      }
      dispatch(setLoading(true));
      const {city, district} = getCityAndDistrict();
      const {exactAddress, images, ...data} = logistic;
      const image = await uploadImage();
      dispatch(
        createLogistic({
          ...data,
          exact_address: exactAddress,
          full_address_object: {
            city,
            district,
          },
          image: image[0],
          owner: {
            displayName: userInfo.displayName,
            phoneNumber: unFormatString(userInfo.phoneNumber, 'phoneNumber'),
            photoURL: userInfo.photoURL,
            uid: userInfo.uid,
          },
          contact: unFormatString(data.contact, 'phoneNumber'),
          price: unFormatString(data.price, 'currency'),
        }),
      );
      check = true;
    } catch (error) {
      console.log('need to handle error at handlerCreateLogistic', error);
      check = false;
    } finally {
      dispatch(setLoading(false));
    }
    return check;
  };

  return {
    handlers: {handleSetLogistic, handlerCreateLogistic},
    selectors: {
      logistic,
      isLoading,
      validation,
    },
  };
};
