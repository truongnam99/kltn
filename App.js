/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Navigation from './src/navigation';
import {MenuProvider} from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';
import Test from './src/containers/test';
import {Button} from './src/components';
import PushNotification from 'react-native-push-notification';

const store = configureStore();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const push = () => {
    PushNotification.localNotification({
      channelId: 'kltn-152365',
      smallIcon: 'ic_launcher',
      title: 'fasfdsdf',
      message: 'Haberin detayını okumak için dokunun',
      data: {},
    });
  };
  const check = () => {
    PushNotification.setApplicationIconBadgeNumber(0);
  };

  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaView style={backgroundStyle}>
          <Button onPress={push} title="push" />
          <Button onPress={check} title="push" />
          {/* <Navigation /> */}
          {/* <Test /> */}
          <FlashMessage position="top" />
        </SafeAreaView>
      </MenuProvider>
    </Provider>
  );
};

export default App;
