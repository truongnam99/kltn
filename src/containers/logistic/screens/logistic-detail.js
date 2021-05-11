import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './logistic-detail.style';
import {translate} from '../../../constants/translate';
import {dial} from '../../../utils/utils';
import FastImage from 'react-native-fast-image';

const LogisticDetail = ({route, ...props}) => {
  const {logistic} = route.params;
  return (
    <View style={styles.container}>
      <FastImage source={{uri: logistic.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <FastImage
            source={{uri: logistic.owner.photoURL}}
            style={styles.userImage}
          />
          <Text style={styles.username}>{logistic.owner.username}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.area}</Text>
          <Text>{logistic.area}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.price}</Text>
          <Text>{logistic.price}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.detail}</Text>
          <Text>{logistic.notes}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{translate.logistic.contact}</Text>
          <View style={styles.rowLayout}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log('You need to setup onpress')}>
              <MaterialIcons
                name="chat"
                size={32}
                color="#0E8DF1"
                style={styles.me16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
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
    </View>
  );
};

export default LogisticDetail;
