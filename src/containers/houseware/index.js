import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {headerOptions} from '../../config';
import {navigationName} from '../../constants/navigation';
import {translate} from '../../constants/translate';
import {Houseware} from './screens/houseware';
import {CreateHouseware} from './screens/create-houseware';
import {MyHouseware} from './screens/my-houseware';

export const HousewareContainer = () => {
  const HousewareStack = createStackNavigator();
  return (
    <HousewareStack.Navigator screenOptions={headerOptions}>
      <HousewareStack.Screen
        name={navigationName.houseware.houseware}
        component={Houseware}
        options={{
          headerLeft: null,
          headerTitle: translate.houseware.houseware,
        }}
      />
      <HousewareStack.Screen
        name={navigationName.houseware.createHouseware}
        component={CreateHouseware}
        options={{
          headerTitle: translate.houseware.createHouseware,
          tabBar: null,
        }}
      />
      <HousewareStack.Screen
        name={navigationName.houseware.myHouseware}
        component={MyHouseware}
        options={{
          headerTitle: translate.houseware.myHouseware,
        }}
      />
    </HousewareStack.Navigator>
  );
};