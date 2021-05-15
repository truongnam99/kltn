import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCity, uploadImageIntoFirebase} from '../../../utils/utils';
import {createInn} from '../../../store/actions/innAction';
import numeral from 'numeral';

export const useCreateInn = ({data = {}}) => {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.innReducer.isLoading);
  const [images, setImages] = useState(
    data.upload_room_images?.map(item => ({uri: item})) || [],
  );
  const [innName, setInnName] = useState(data.room_name);
  const [innOwner, setInnOwner] = useState(userInfo?.displayName);
  const [innStatus, setInnStatus] = useState(data.available_status || 1);
  const [innPrice, setInnPrice] = useState(data.room_price);
  const [innAddress, setInnAddress] = useState(data.exact_room_address);
  const [innElectricPrice, setInnElectricPrice] = useState(data.electric_price);
  const [innWaterPrice, setInnWaterPrice] = useState(data.water_price);
  const [innArea, setInnArea] = useState(data.room_area);
  const [innDeposit, setInnDeposit] = useState(data.deposit);
  const [innWifi, setInnWifi] = useState(data.room_wifi);
  const [innGarage, setInnGarage] = useState(data.parking_situation);
  const [innDistrict, setInnDistrict] = useState(
    data.full_address_object?.district.code,
  );
  const [innCity, setInnCity] = useState(data.full_address_object?.city.code);
  const [innContact, setInnContact] = useState(
    data.phone_number || userInfo?.phoneNumber,
  );
  const [innMaxRoommate, setMaxRoommate] = useState(data.max_roommate);
  const [innAttention, setInnAttention] = useState(data.attention);
  const [innNotes, setInnNotes] = useState(data.notes);
  const [roomBed, setRoomBed] = useState(data.room_bed || false);
  const [roomCloset, setRoomCloset] = useState(data.room_closet || false);
  const [roomKetchen, setRoomKetchen] = useState(data.room_ketchen || false);
  const [roomPetsAllowed, setRoomPetsAllowed] = useState(
    data.room_pets_allowed || false,
  );
  const [roomTivi, setRoomTivi] = useState(data.room_tivi || false);
  const [roomRefrigerator, setRoomRefrigerator] = useState(
    data.room_refrigerator || false,
  );
  const [roomAirConditioner, setRoomAirConditioner] = useState(
    data.air_conditioner || false,
  );
  const [roomWashingMachine, setRoomWashingMachine] = useState(
    data.room_washing_machine || false,
  );
  const handleChangeImages = useCallback(
    value => {
      setImages(value);
    },
    [setImages],
  );
  const handleSetInnName = useCallback(
    value => {
      setInnName(value);
    },
    [setInnName],
  );

  const handleSetInnOwner = value => {
    setInnOwner(value);
  };

  const handleSetInnStatus = useCallback(
    value => {
      setInnStatus(value);
    },
    [setInnStatus],
  );

  const handleSetInnPrice = useCallback(
    value => {
      setInnPrice(value);
    },
    [setInnPrice],
  );

  const handleSetInnAddress = useCallback(
    value => {
      setInnAddress(value);
    },
    [setInnAddress],
  );

  const handleSetInnElectricPrice = useCallback(
    value => {
      setInnElectricPrice(value);
    },
    [setInnElectricPrice],
  );

  const handleSetInnWaterPrice = useCallback(
    value => {
      setInnWaterPrice(value);
    },
    [setInnWaterPrice],
  );

  const handleSetInnArea = useCallback(
    value => {
      setInnArea(value);
    },
    [setInnArea],
  );

  const handleSetInnDeposit = useCallback(
    value => {
      setInnDeposit(value);
    },
    [setInnDeposit],
  );

  const handleSetInnWifi = useCallback(
    value => {
      setInnWifi(value);
    },
    [setInnWifi],
  );

  const handleSetInnGarage = useCallback(
    value => {
      setInnGarage(value);
    },
    [setInnGarage],
  );

  const handleSetInnDistrict = useCallback(
    value => {
      setInnDistrict(value);
    },
    [setInnDistrict],
  );

  const handleSetInnCity = value => {
    setInnCity(value);
  };

  const handleSetInnContact = useCallback(
    value => {
      setInnContact(value);
    },
    [setInnContact],
  );

  const handleSetMaxRoommate = useCallback(
    value => {
      setMaxRoommate(value);
    },
    [setMaxRoommate],
  );

  const handleSetInnAttention = useCallback(
    value => {
      setInnAttention(value);
    },
    [setInnAttention],
  );

  const handleSetInnNotes = useCallback(
    value => {
      setInnNotes(value);
    },
    [setInnNotes],
  );

  const handleSetRoomBed = useCallback(
    value => {
      setRoomBed(value);
    },
    [setRoomBed],
  );

  const handleSetRoomCloset = useCallback(
    value => {
      setRoomCloset(value);
    },
    [setRoomCloset],
  );
  const handleSetRoomKetchen = useCallback(
    value => {
      setRoomKetchen(value);
    },
    [setRoomKetchen],
  );
  const handleSetRoomPetsAllowed = useCallback(
    value => {
      setRoomPetsAllowed(value);
    },
    [setRoomPetsAllowed],
  );
  const handleSetRoomRefrigerator = useCallback(
    value => {
      setRoomRefrigerator(value);
    },
    [setRoomRefrigerator],
  );
  const handleSetRoomTivi = useCallback(
    value => {
      setRoomTivi(value);
    },
    [setRoomTivi],
  );
  const handleSetRoomWashingMachine = useCallback(
    value => {
      setRoomWashingMachine(value);
    },
    [setRoomWashingMachine],
  );
  const handleSetAirConditioner = useCallback(
    value => {
      setRoomAirConditioner(value);
    },
    [setRoomAirConditioner],
  );

  const uploadImage = async () => {
    const img = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].uri.startsWith('http')) {
        img.push(images[i].uri);
        continue;
      }
      const result = await uploadImageIntoFirebase(images[i].uri);
      img.push(await result.getDownloadURL());
    }
    return img;
  };

  const handleCreateInn = async () => {
    const city = getCity(innCity);
    const upload_room_images = await uploadImage();
    const district = city.Districts?.find(item => item.Id === innDistrict);
    const payload = {
      ...data,
      room_name: innName,
      room_owner: innOwner,
      created_by: userInfo || data.created_by,
      available_status: innStatus,
      room_price: numeral(innPrice).value(),
      exact_room_address: innAddress,
      electric_price: numeral(innElectricPrice).value(),
      water_price: numeral(innWaterPrice).value(),
      room_area: numeral(innArea).value(),
      deposit: numeral(innDeposit).value(),
      room_wifi: innWifi,
      parking_situation: innGarage,
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
      phone_number: innContact,
      max_roommate: numeral(innMaxRoommate).value(),
      attention: innAttention,
      notes: innNotes,
      room_bed: roomBed,
      room_closet: roomCloset,
      room_ketchen: roomKetchen,
      room_pets_allowed: roomPetsAllowed,
      room_tivi: roomTivi,
      room_refrigerator: roomRefrigerator,
      air_conditioner: roomAirConditioner,
      room_washing_machine: roomWashingMachine,
      upload_room_images,
    };
    dispatch(createInn(payload));
  };

  return {
    handlers: {
      handleSetInnName,
      handleSetInnOwner,
      handleSetInnStatus,
      handleSetInnPrice,
      handleSetInnAddress,
      handleSetInnElectricPrice,
      handleSetInnWaterPrice,
      handleSetInnArea,
      handleSetInnDeposit,
      handleSetInnWifi,
      handleSetInnGarage,
      handleSetInnDistrict,
      handleSetInnCity,
      handleSetInnContact,
      handleSetMaxRoommate,
      handleSetInnAttention,
      handleSetInnNotes,
      handleSetRoomBed,
      handleSetRoomCloset,
      handleSetRoomKetchen,
      handleSetRoomPetsAllowed,
      handleSetRoomRefrigerator,
      handleSetRoomTivi,
      handleSetRoomWashingMachine,
      handleSetAirConditioner,
      handleCreateInn,
      handleChangeImages,
    },
    selectors: {
      images,
      isLoading,
      innName,
      innOwner,
      innStatus,
      innPrice,
      innAddress,
      innElectricPrice,
      innWaterPrice,
      innArea,
      innDeposit,
      innWifi,
      innGarage,
      innDistrict,
      innCity,
      innContact,
      innMaxRoommate,
      innAttention,
      innNotes,
      roomBed,
      roomCloset,
      roomKetchen,
      roomPetsAllowed,
      roomTivi,
      roomRefrigerator,
      roomWashingMachine,
      roomAirConditioner,
    },
  };
};
