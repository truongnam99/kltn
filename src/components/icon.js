import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {lightTheme} from '../config/theme';

export const AreaIcon = () => (
  <MaterialIcons name="photo-size-select-small" size={32} color="#00A14F" />
);

export const ElectrictIcon = ({size = 32}) => (
  <MaterialIcons name="electrical-services" size={size} color="#EFC416" />
);

export const WaterIcon = ({size = 32}) => (
  <Ionicons name="ios-water-outline" size={size} color="#2EACF7" />
);

export const AirConditionerIcon = () => (
  <MaterialCommunityIcons name="air-conditioner" size={32} color="#00BBF7" />
);

export const BathroomIcon = () => (
  <MaterialIcons name="bathtub" size={32} color="#2BAEBE" />
);

export const ParkingIcon = () => (
  <MaterialCommunityIcons name="bed-queen" size={32} color="#084D9F" />
);

export const WifiIcon = () => (
  <Ionicons name="ios-wifi" size={32} color="#27AFED" />
);

export const FridgeIcon = () => (
  <MaterialCommunityIcons name="fridge-outline" size={32} color="#4CB9CA" />
);

export const WashingMachineIcon = () => (
  <MaterialCommunityIcons name="washing-machine" size={32} color="#F75683" />
);

export const BedRoomIcon = () => (
  <MaterialCommunityIcons name="bed-empty" size={32} color="#90562C" />
);

export const TiviIcon = () => (
  <MaterialCommunityIcons name="television-classic" size={32} color="#E4AE25" />
);

export const WindowIcon = () => (
  <MaterialCommunityIcons
    name="microsoft-windows"
    size={32}
    color={lightTheme.iconColor}
  />
);

export const KitchenIcon = () => (
  <MaterialIcons name="kitchen" size={32} color={lightTheme.iconColor} />
);

export const PedAllowIcon = () => (
  <MaterialIcons name="pets" size={32} color="#5E1FCC" />
);

export const GuardIcon = () => (
  <MaterialIcons name="verified-user" size={32} color={lightTheme.iconColor} />
);

export const GenderIcon = ({size = 32}) => (
  <MaterialCommunityIcons
    name="gender-male-female"
    size={size}
    color="#009ADE"
  />
);

export const JobIcon = ({size = 32}) => (
  <MaterialIcons name="work" size={size} color="#4E9ECD" />
);
