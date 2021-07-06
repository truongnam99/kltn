/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Navigation from './src/navigation';
import {MenuProvider} from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';

const store = configureStore();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // const post = async () => {
  //   try {
  //     if (!messaging().isDeviceRegisteredForRemoteMessages) {
  //       messaging().registerDeviceForRemoteMessages();
  //     }
  //     const token = await messaging().getToken();

  //     const result = await fetch('https://fcm.googleapis.com/fcm/send', {
  //       method: 'post',
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //         Authorization:
  //           'key=AAAA3M28g7w:APA91bHLi1WyKFQAlVGA77GhMWI8B-oLOtSwnY3isG3eWOyiUr81S6qoeYKiiuYCyRNWfOm4XuMYAH8K1MQ7letcNeTIXN-qwoGoIiMV1X_LCSb4SpAG-REYs_cIm6F8s6Xwml0ai2Qj',
  //       }),
  //       body: JSON.stringify({
  //         to: token,
  //         data: {
  //           text: 'hi',
  //           sendName: 'FCM Message',
  //         },
  //       }),
  //     });
  //     console.log('result: ', token);
  //   } catch (e) {
  //     console.log('eeeeee', e);
  //   }
  // };

  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaView style={backgroundStyle}>
          <Navigation />
          <FlashMessage position="top" />
        </SafeAreaView>
      </MenuProvider>
    </Provider>
  );
};

export default App;
