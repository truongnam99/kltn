import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';

export const Preview = ({visible, images, onClose}) => {
  if (!visible || !images?.length) {
    return null;
  }
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.container}>
        <Swiper containerStyle={styles.swiper}>
          {images?.map((image, index) => (
            <View style={styles.imageContainer} key={index}>
              <FastImage source={{uri: image}} style={styles.image} />
            </View>
          ))}
        </Swiper>
        <View style={styles.buttonClose}>
          <AntDesign
            name="close"
            size={24}
            style={styles.icon}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#656464cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    position: 'absolute',
    bottom: 18,
  },
  icon: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 32,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    marginBottom: 60,
  },
});
