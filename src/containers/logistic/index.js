import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Logistic from './screens/logistic';
import LogisticDetail from './screens/logistic-detail';
import {translate} from '../../constants/translate';
import {navigationName} from '../../constants/navigation';
import {headerOptions} from '../../config/index';
import CreateLogistic from './screens/create-logistic';
import MyLogistic from './screens/my-logistic';

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
      <LogisticStack.Screen
        name={navigationName.logistic.createLogistic}
        component={CreateLogistic}
        options={{
          headerTitle: translate.logisticDetail,
        }}
      />
      <LogisticStack.Screen
        name={navigationName.logistic.myLogistic}
        component={MyLogistic}
        options={{
          headerTitle: 'Dịch vụ đã đăng',
        }}
      />
    </LogisticStack.Navigator>
  );
};

export default LogisticContainer;
