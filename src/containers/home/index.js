import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {navigationName} from '../../constants/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FindInn} from '../find-inn';
import Loading from '../loading';
import Profile from '../profile/screen/profile';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FindInn} />
      <Tab.Screen name="Settings" component={Loading} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
