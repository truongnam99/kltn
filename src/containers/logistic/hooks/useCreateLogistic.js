import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createLogistic} from '../../../store/actions/logisticAction';
import {getCity, uploadImageIntoFirebase} from '../../../utils/utils';

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
    price: data.price,
    city: data.full_address_object?.city.Id || '79',
    district: data.full_address_object?.district.Id,
    ownerName: data.ownerName || userInfo.displayName,
    contact: data.contact || userInfo.phoneNumber,
    notes: data.notes,
  });

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
          phoneNumber: userInfo.phoneNumber,
          photoURL: userInfo.photoURL,
          uid: userInfo.uid,
        },
      }),
    );
  };

  return {
    handlers: {handleSetLogistic, handlerCreateLogistic},
    selectors: {
      logistic,
      isLoading,
    },
  };
};
