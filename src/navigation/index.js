import React from 'react';

import {navigationName} from '../constants/navigation';
import Loading from '../containers/loading';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneLogin from '../containers/login/screens/phone-login';
import Login from '../containers/login/screens/login';
import ConfirmCode from '../containers/login/screens/confirm-code';
import Home from '../containers/home';
import AdditionalInfo from '../containers/login/screens/additional-info';

export default function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={navigationName.loading} component={Loading} />
        <Stack.Screen name={navigationName.login.login} component={Login} />
        <Stack.Screen
          name={navigationName.login.loginWithPhoneNumber}
          component={PhoneLogin}
        />
        <Stack.Screen name={navigationName.homeContainer} component={Home} />
        <Stack.Screen
          name={navigationName.login.confirmCode}
          component={ConfirmCode}
        />
        <Stack.Screen
          name={navigationName.login.additionalUserInfo}
          component={AdditionalInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
