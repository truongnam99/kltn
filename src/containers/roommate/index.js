import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {headerOptions} from '../../config';
import {navigationName} from '../../constants/navigation';
import {translate} from '../../constants/translate';
import Roommate from './screens/roommate';
import Post from './screens/post';
import {MyPost} from './screens/my-post';

const RoommateStack = createStackNavigator();

export default function RoommateContainer() {
  return (
    <RoommateStack.Navigator screenOptions={headerOptions}>
      <RoommateStack.Screen
        name={navigationName.roommate.roommate}
        component={Roommate}
        options={{
          headerLeft: null,
          headerTitle: translate.roommate.findRoommate,
        }}
      />
      <RoommateStack.Screen
        name={navigationName.roommate.post}
        component={Post}
        options={{
          headerTitle: translate.roommate.post,
        }}
      />
      <RoommateStack.Screen
        name={navigationName.roommate.myPost}
        component={MyPost}
        options={{
          headerTitle: translate.roommate.myPost,
        }}
      />
    </RoommateStack.Navigator>
  );
}
