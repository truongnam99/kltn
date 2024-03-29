import React, {useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './logistic-detail.style';
import {translate} from '../../../constants/translate';
import {dial, getCity, shortenDistrictName} from '../../../utils/utils';
import {navigationName} from '../../../constants/navigation';
import {activeOpacity} from '../../../components/shared';
import {Image, Text} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {Preview} from '../../../components/preview';
import {lightTheme} from '../../../config/theme';
import {Review} from '../../review/review';
import {globalStyles} from '../../../global.style';
import {ReportContainer} from '../../../components/report-container';
import {ReportIcon} from '../../../components/icon';

const LogisticDetail = ({route, navigation}) => {
  const {logistic} = route.params;
  const {owner} = logistic;
  const [previewImage, setPreviewImage] = useState(null);

  const onPreviewClose = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const onPreviewOpen = useCallback(() => {
    setPreviewImage(logistic.image);
  }, [logistic.image]);

  const onViewProfile = () => {
    navigation.navigate(navigationName.logistic.viewProfile, {profile: owner});
  };

  const city = getCity(logistic.city);

  const onGotoChat = () => {
    if (!owner) {
      return;
    }
    navigation.navigate(navigationName.logistic.chat, {
      name: owner.ownerName || owner.displayName || owner.username,
      photoUrl: owner.photoURL,
      destUser: {
        id: owner.uid,
        displayName: owner.ownerName || owner.displayName || owner.username,
        photoURL: owner.photoURL,
      },
    });
  };

  return (
    <View style={styles.flex}>
      <ScrollView>
        <Preview
          visible={!!previewImage}
          onClose={onPreviewClose}
          images={[previewImage]}
        />
        <TouchableOpacity
          style={styles.container}
          activeOpacity={activeOpacity}
          onPress={onPreviewOpen}>
          <Image image={logistic.image} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.userContainer}>
            <Image
              image={logistic.owner.photoURL}
              style={styles.userImage}
              isAvata={true}
            />
            <Text style={styles.username}>
              {owner.userName || owner.displayName}
            </Text>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onViewProfile}>
              <MaterialIcons name="info-outline" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text types="bold,h2">{translate.logistic.area}</Text>
            {logistic.area && (
              <Text>
                {logistic.area
                  ?.map(item =>
                    shortenDistrictName(
                      city.Districts.find(d => d.Id === item)?.Name,
                    ),
                  )
                  .join(', ')}
              </Text>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text types="bold,h2">{translate.logistic.price}</Text>
            <Text>{logistic.price}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text types="bold,h2">{translate.logistic.detail}</Text>
            <Text>{logistic.notes}</Text>
          </View>
          <ReportContainer id={logistic.id} collection="Logistics">
            <View
              style={[
                styles.contentContainer,
                globalStyles.row,
                globalStyles.center,
              ]}>
              <ReportIcon size={24} />
              <Text style={globalStyles.ml8}>Báo cáo vi phạm</Text>
            </View>
          </ReportContainer>
        </View>

        <Review reviewId={logistic.id} />
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
            onPress={() => dial(logistic.owner.phoneNumber)}
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

export default LogisticDetail;
