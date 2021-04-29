import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Logistic from './screens/logistic';
import LogisticDetail from './screens/logistic-detail';
import {translate} from '../../constants/translate';
import {navigationName} from '../../constants/navigation';
import {headerOptions} from '../../config/index';

const LogisticContainer = () => {
  const LogisticStack = createStackNavigator();

  return (
    <LogisticStack.Navigator screenOptions={headerOptions}>
      <LogisticStack.Screen
        name={navigationName.logistic.logistic}
        component={Logistic}
        options={{
          headerTitle: translate.logisticService,
          headerLeft: null,
        }}
      />
      <LogisticStack.Screen
        name={navigationName.logistic.logisticDetail}
        component={LogisticDetail}
        options={{
          headerTitle: translate.logisticDetail,
        }}
      />
    </LogisticStack.Navigator>
  );
};

export default LogisticContainer;
