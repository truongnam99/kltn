import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FindInn from './screens/find-inn';
import FindInnDetail from './screens/find-inn-detail';
import MyInn from './screens/my-inn';
import CreateInn from './screens/create-inn';
import Profile from '../profile/screen/profile';
import {navigationName} from '../../constants/navigation';
import {translate} from '../../constants/translate';
import {headerOptions} from '../../config/index';

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
        options={({route}) => ({
          title: route.params?.data ? 'Cập nhật trọ' : 'Tạo Trọ',
        })}
      />
      <HomeStack.Screen
        name={navigationName.findInn.myInn}
        component={MyInn}
        options={{
          headerTitle: translate.inn.myInn,
        }}
      />
      <HomeStack.Screen
        name={navigationName.findInn.viewProfile}
        component={Profile}
        options={({route}) => ({
          title: route.params.profile?.displayName || '',
        })}
      />
    </HomeStack.Navigator>
  );
}
