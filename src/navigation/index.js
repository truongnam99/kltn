import React from 'react';

import {navigationName} from '../constants/navigation';
import Loading from '../containers/loading';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PhoneLogin from '../containers/login/screens/phone-login';
import Login from '../containers/login/screens/login';
import ConfirmCode from '../containers/login/screens/confirm-code';
import Home from '../containers/home';
import AdditionalInfo from '../containers/login/screens/additional-info';

const RootStack = createStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode="none"
        mode="modal"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Screen name={navigationName.loading} component={Loading} />
        <RootStack.Screen name={navigationName.login.login} component={Login} />
        <RootStack.Screen
          name={navigationName.login.loginWithPhoneNumber}
          component={PhoneLogin}
        />
        <RootStack.Screen
          name={navigationName.homeContainer}
          component={Home}
        />
        <RootStack.Screen
          name={navigationName.login.confirmCode}
          component={ConfirmCode}
        />
        <RootStack.Screen
          name={navigationName.login.additionalUserInfo}
          component={AdditionalInfo}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
