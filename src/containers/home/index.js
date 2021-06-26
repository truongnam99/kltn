import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import LogisticContainer from '../logistic';
import RoommateContainer from '../roommate';
import ChatContainer from '../chat';
import HousewareContainer from '../houseware';
import FinnInnContainer from '../find-inn';
import Profile from '../profile/screen/profile';
import {navigationName} from '../../constants/navigation';
import {lightTheme} from '../../config/theme';

const Tab = createBottomTabNavigator();

const Home = props => {
  useEffect(() => {
    const userId = auth().currentUser.uid;
    const reference = database().ref(`/online/${userId}`);
    reference.set(true);
    reference.onDisconnect().remove();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: '#f4f4f4',
      }}>
      <Tab.Screen
        name={navigationName.home.inn}
        component={FinnInnContainer}
        options={{
          tabBarIcon: attributes => (
            <FontAwesome
              name="home"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationName.home.logistic}
        component={LogisticContainer}
        options={{
          tabBarIcon: attributes => (
            <MaterialIcons
              name="local-shipping"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationName.home.roommate}
        component={RoommateContainer}
        options={{
          tabBarIcon: attributes => (
            <MaterialIcons
              name="group-add"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationName.home.houseware}
        component={HousewareContainer}
        options={{
          tabBarIcon: attributes => (
            <MaterialIcons
              name="store"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationName.home.chat}
        component={ChatContainer}
        options={{
          tabBarIcon: attributes => (
            <MaterialIcons
              name="speaker-notes"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationName.home.profile}
        component={Profile}
        options={{
          tabBarIcon: attributes => (
            <MaterialIcons
              name="person"
              {...attributes}
              size={32}
              color={lightTheme.primary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
