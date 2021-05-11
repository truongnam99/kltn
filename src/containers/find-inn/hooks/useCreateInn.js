import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCity, uploadImageIntoFirebase} from '../../../utils/utils';
import {createInn} from '../../../store/actions/innAction';
import numeral from 'numeral';

export const useCreateInn = () => {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.innReducer.isLoading);
  const [images, setImages] = useState([]);
  const [innName, setInnName] = useState();
  const [innOwner, setInnOwner] = useState(userInfo?.displayName);
  const [innStatus, setInnStatus] = useState(1);
  const [innPrice, setInnPrice] = useState();
  const [innAddress, setInnAddress] = useState();
  const [innElectricPrice, setInnElectricPrice] = useState();
  const [innWaterPrice, setInnWaterPrice] = useState();
  const [innArea, setInnArea] = useState();
  const [innDeposit, setInnDeposit] = useState();
  const [innWifi, setInnWifi] = useState();
  const [innGarage, setInnGarage] = useState();
  const [innDistrict, setInnDistrict] = useState();
  const [innCity, setInnCity] = useState();
  const [innContact, setInnContact] = useState(userInfo?.phoneNumber);
  const [innMaxRoommate, setMaxRoommate] = useState();
  const [innAttention, setInnAttention] = useState();
  const [innNotes, setInnNotes] = useState();
  const [roomBed, setRoomBed] = useState(false);
  const [roomCloset, setRoomCloset] = useState(false);
  const [roomKetchen, setRoomKetchen] = useState(false);
  const [roomPetsAllowed, setRoomPetsAllowed] = useState(false);
  const [roomTivi, setRoomTivi] = useState(false);
  const [roomRefrigerator, setRoomRefrigerator] = useState(false);
  const [roomAirConditioner, setRoomAirConditioner] = useState(false);
  const [roomWashingMachine, setRoomWashingMachine] = useState(false);

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
      const result = await uploadImageIntoFirebase(images[i].uri);
      img.push(await result.getDownloadURL());
    }
    return img;
  };

  const handleCreateInn = async () => {
    const city = getCity(innCity);
    const upload_room_images = await uploadImage();
    const district = city.Districts?.find(item => item.Id === innDistrict);
    const data = {
      room_name: innName,
      room_owner: innOwner,
      created_by: userInfo,
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
    dispatch(createInn(data));
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
