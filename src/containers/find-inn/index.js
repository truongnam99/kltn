import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FindInn from './screens/find-inn';
import FindInnDetail from './screens/find-inn-detail';
import CreateInn from './screens/create-inn';
import {translate} from '../../constants/translate';
import {headerOptions} from '../../config/index';
import {navigationName} from '../../constants/navigation';

export default function FinnInnContainer() {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen
        name={navigationName.findInn.findInn}
        component={FindInn}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={navigationName.findInn.innDetail}
        component={FindInnDetail}
        options={{
          headerTitle: translate.findInnDetail,
        }}
      />
      <HomeStack.Screen
        name={navigationName.findInn.createInn}
        component={CreateInn}
        options={{
          headerTitle: translate.inn.createInn,
        }}
      />
    </HomeStack.Navigator>
  );
}
