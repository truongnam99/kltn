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
        <View style={styles.contentContainer}>
          <Text types="bold,h2">{translate.logistic.contact}</Text>
          <View style={styles.rowLayout}>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onGotoChat}>
              <MaterialIcons
                name="chat"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={() => dial(logistic.owner.phoneNumber)}>
              <MaterialIcons
                name="call"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogisticDetail;
