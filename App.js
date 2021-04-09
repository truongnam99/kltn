/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/containers/login/screens/login';
import PhoneLogin from './src/containers/login/screens/phone-login';
import {navigationName} from './src/constants/navigation';
import ConfirmCode from './src/containers/login/screens/confirm-code';
import FindInn from './src/containers/find-inn';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const Stack = createStackNavigator();
  // const [confirm, setConfirm] = useState(null);
  // const [code, setCode] = useState('');

  // async function signInWithPhoneNumber(phoneNumber) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }

  // async function confirmCode() {
  //   try {
  //     console.log('aaaaaaaaa');
  //     console.log(confirm, code);
  //     const response = await confirm.confirm(code);
  //     if (response) {
  //       // return addition more info if isNewUser, else go to home
  //     } else {
  //       // show message code false
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="phone number sign in"
  //       onPress={() => signInWithPhoneNumber('+84 949709036')}
  //     />
  //   );
  // }

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name={navigationName.login.login} component={Login} />
          <Stack.Screen
            name={navigationName.login.loginWithPhoneNumber}
            component={PhoneLogin}
          />
          <Stack.Screen
            name={navigationName.login.confirmCode}
            component={ConfirmCode}
          />
          <Stack.Screen
            name={navigationName.findInn.findInn}
            component={FindInn}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <StatusBar
        backgroundColor={lightTheme.primary}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
    </SafeAreaView>
  );
};

export default App;
