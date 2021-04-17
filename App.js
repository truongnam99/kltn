/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Dimensions, SafeAreaView, useColorScheme} from 'react-native';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';

import allReducers from './src/store/reducers';
import Navigation from './src/navigation';
import Test from './src/containers/test';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// const store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        {/* <Test /> */}
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
