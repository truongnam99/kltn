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
import Test from './src/containers/test';
import configureStore from './src/store';
import Navigation from './src/navigation';
import auth from '@react-native-firebase/auth';
import {MenuProvider} from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';

const store = configureStore();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaView style={backgroundStyle}>
          {/* <Test /> */}
          <Navigation />
          <FlashMessage position="top" />
        </SafeAreaView>
      </MenuProvider>
    </Provider>
  );
};

export default App;
