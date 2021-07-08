import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {headerOptions} from '../../config';
import {navigationName} from '../../constants/navigation';
import {translate} from '../../constants/translate';
import Roommate from './screens/roommate';
import Post from './screens/post';
import {MyPost} from './screens/my-post';
import ChatDetail from '../chat/screens/chat-detail';
import Profile from '../profile/screen/profile';

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
        options={({route}) => ({
          title: route.params?.data ? 'Cập nhật bài viết' : 'Tạo bài viết',
        })}
      />
      <RoommateStack.Screen
        name={navigationName.roommate.myPost}
        component={MyPost}
        options={{
          headerTitle: translate.roommate.myPost,
        }}
      />
      <RoommateStack.Screen
        name={navigationName.roommate.profile}
        component={Profile}
        options={({route}) => ({
          title: route.params.profile?.displayName || '',
        })}
      />
      <RoommateStack.Screen
        name={navigationName.roommate.chat}
        component={ChatDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </RoommateStack.Navigator>
  );
}
