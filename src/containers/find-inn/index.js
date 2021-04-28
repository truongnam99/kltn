import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FindInn from './screens/find-inn';
import FindInnDetail from './screens/find-inn-detail';
import {translate} from '../../constants/translate';
import {headerOptions} from '../../config/index';

export default function FinnInnContainer() {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen
        name={'FindInnFindInn'}
        component={FindInn}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={'FindInnDetailFindInnDetail'}
        component={FindInnDetail}
        options={{
          headerTitle: translate.findInnDetail,
        }}
      />
    </HomeStack.Navigator>
  );
}
