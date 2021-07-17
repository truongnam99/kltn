import React, {useCallback, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ImageView, Text} from '../../../components/index';
import Image from '../../../components/image/image';
import {dial, formatString, numeralPrice} from '../../../utils/utils';
import {navigationName} from '../../../constants/navigation';
import {activeOpacity} from '../../../components/shared';
import styles from './find-inn-detail.style';
import {Preview} from '../../../components/preview';
import {lightTheme} from '../../../config/theme';
import {
  AirConditionerIcon,
  AreaIcon,
  BathroomIcon,
  BedRoomIcon,
  ElectrictIcon,
  FridgeIcon,
  GuardIcon,
  KitchenIcon,
  ParkingIcon,
  PedAllowIcon,
  ReportIcon,
  TiviIcon,
  WashingMachineIcon,
  WaterIcon,
  WifiIcon,
  WindowIcon,
} from '../../../components/icon';
import {Review} from '../../review/review';
import {getTypeInn} from '../../../constants/constants';
import {globalStyles} from '../../../global.style';
import {ReportContainer} from '../../../components/report-container';

const FindInnDetail = ({route, navigation}) => {
  const {inn} = route.params;
  const [openPreview, setOpenPreview] = useState(false);

  const onPreviewOpen = useCallback(() => {
    setOpenPreview(true);
  }, []);

  const onPreviewClose = useCallback(() => {
    setOpenPreview(false);
  }, []);

  const onGotoChat = () => {
    if (!inn.created_by) {
      return;
    }
    navigation.navigate(navigationName.findInn.chat, {
      name: inn.created_by.displayName,
      photoUrl: inn.created_by.photoURL,
      destUser: {
        id: inn.created_by.uid,
        displayName: inn.created_by.displayName,
        photoURL: inn.created_by.photoURL,
      },
    });
  };

  const onViewProfile = () => {
    navigation.navigate(navigationName.findInn.viewProfile, {
      profile: inn.created_by,
    });
  };

  return (
    <View style={styles.container}>
      <Preview
        images={inn.upload_room_images}
        visible={openPreview}
        onClose={onPreviewClose}
      />
      <ScrollView>
        {inn.upload_room_images?.length && (
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPreviewOpen}>
            <ImageView images={inn.upload_room_images} />
          </TouchableOpacity>
        )}
        <View style={styles.detailContainer}>
          <View
            style={[
              styles.primaryContainer,
              styles.row,
              styles.alignEnd,
              styles.center,
            ]}>
            <Image
              image={inn.created_by?.photoURL}
              style={styles.avatar}
              isAvata={true}
            />
            <Text style={[styles.fontSize16, styles.fz16, styles.ml6]}>
              {inn.created_by?.displayName}
            </Text>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onViewProfile}>
              <MaterialIcons name="info-outline" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.primaryContainer}>
            <Text style={styles.name}>{inn.room_name}</Text>

            <Text>
              <Ionicons name="location-outline" size={16} />
              {' ' + inn.exact_room_address}
            </Text>
            <Text>
              <AntDesign name="phone" size={16} />{' '}
              {' ' + formatString(inn.phone_number, 'phoneNumber')}
            </Text>
            <View
              style={[
                styles.row,
                styles.sb,
                styles.lineTop,
                styles.mv,
                styles.pv,
                styles.lineBottom,
              ]}>
              <View>
                <Text style={globalStyles.tcenter}>GIÁ PHÒNG</Text>
                <Text style={[styles.price, globalStyles.tcenter]}>
                  {numeralPrice(inn.room_price)} đ
                </Text>
              </View>
              <View>
                <Text style={globalStyles.tcenter}>TIỀN CỘC</Text>
                <Text style={[styles.price, globalStyles.tcenter]}>
                  {numeralPrice(inn.deposit)} đ
                </Text>
              </View>
              <View>
                <Text style={globalStyles.tcenter}>LOẠI</Text>
                <Text style={[styles.price, globalStyles.tcenter]}>
                  {getTypeInn(inn.type)}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.sb]}>
              <View style={styles.center}>
                <AreaIcon />
                <Text>{inn.room_area} m2</Text>
              </View>
              <View style={styles.center}>
                <ElectrictIcon />
                <Text>{numeralPrice(inn.electric_price)} k/kw</Text>
              </View>
              <View style={styles.center}>
                <WaterIcon />
                <Text>{numeralPrice(inn.water_price)} k/m3</Text>
              </View>
            </View>
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Mô tả</Text>
            <Text>{inn.notes}</Text>
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Tiện ích</Text>
            <View style={styles.row}>
              {inn.air_conditioner && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <AirConditionerIcon />
                  <Text>Máy lạnh</Text>
                </View>
              )}
              {inn.room_bathroom && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <BathroomIcon />
                  <Text>Phòng tắm</Text>
                </View>
              )}
              {inn.parking_situation && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <ParkingIcon />
                  <Text>Chỗ đổ xe</Text>
                </View>
              )}
              {inn.room_wifi && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <WifiIcon />
                  <Text>Wifi</Text>
                </View>
              )}
              {inn.room_refrigerator && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <FridgeIcon />
                  <Text>Tủ lạnh</Text>
                </View>
              )}
              {inn.room_washing_machine && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <WashingMachineIcon />
                  <Text>Máy giặt</Text>
                </View>
              )}
              {inn.security_guard && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <GuardIcon />
                  <Text>Bảo vệ</Text>
                </View>
              )}
              {inn.room_bed && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <BedRoomIcon />
                  <Text>Phòng ngủ</Text>
                </View>
              )}
              {inn.room_tivi && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <TiviIcon />
                  <Text>Tivi</Text>
                </View>
              )}
              {inn.room_pets_allowed && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <PedAllowIcon />
                  <Text>Cho nuôi thú cưng</Text>
                </View>
              )}
              {inn.room_kitchen && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <KitchenIcon />
                  <Text>Nhà bếp</Text>
                </View>
              )}
              {inn.window && (
                <View style={[styles.center, styles.iconWidth, styles.mv]}>
                  <WindowIcon />
                  <Text>Cửa số</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.primaryContainer}>
            <Text types="bold,h2">Chú ý</Text>
            {inn.attention && <Text>{inn.attention}</Text>}
          </View>
          <ReportContainer id={inn.uid} collection="Inns">
            <View
              style={[
                styles.primaryContainer,
                styles.row,
                globalStyles.center,
              ]}>
              <ReportIcon size={24} />
              <Text style={styles.ml6}>Báo cáo vi phạm</Text>
            </View>
          </ReportContainer>
        </View>

        <Review reviewId={inn.uid} />
      </ScrollView>
      <View style={styles.contactContainer}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onGotoChat}
          style={styles.buttonContact}>
          <MaterialIcons
            name="chat"
            size={32}
            color={lightTheme.primary}
            style={styles.me16}
          />
          <Text>Nhắn tin</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={() => dial(inn.phone_number)}
            style={styles.buttonContact}>
            <MaterialIcons
              name="call"
              size={32}
              color={lightTheme.primary}
              style={styles.me16}
            />
            <Text>Gọi điện</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FindInnDetail;
