import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

export const ReportIcon = ({size = 32}) => (
  <MaterialCommunityIcons
    name="comment-alert-outline"
    size={size}
    color="#EB4036"
  />
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

export const EditProfileIcon = () => (
  <MaterialCommunityIcons name="account-edit" size={32} color="#1DA1C0" />
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

export const EmailIcon = ({size = 32}) => (
  <MaterialCommunityIcons
    name="email-edit-outline"
    size={size}
    color="#FF6666"
  />
);

export const LicenseIcon = ({size = 32}) => (
  <MaterialCommunityIcons name="license" size={size} color="#2D75B7" />
);

export const PhoneIcon = ({size = 32}) => (
  <MaterialIcons name="local-phone" size={size} color={lightTheme.primary} />
);

export const SettingIcon = ({size = 32}) => (
  <MaterialIcons name="settings" size={size} color="#7C7C7C" />
);

export const BirthdayIcon = ({size = 32}) => (
  <MaterialIcons name="cake" size={size} color="#D46D84" />
);

export const LogoutIcon = ({size = 32}) => (
  <MaterialIcons name="logout" size={size} color="#D46D84" />
);

export const ContactSupportIcon = ({size = 32}) => (
  <MaterialIcons name="contact-mail" size={size} color="#B80600" />
);

export const FeedbackIcon = ({size = 32}) => (
  <MaterialIcons name="feedback" size={size} color="#D46D84" />
);

export const HomeIcon = ({size = 32}) => (
  <Ionicons name="home" size={size} color="#86C3D2" />
);
