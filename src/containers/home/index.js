import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FinnInnContainer from '../find-inn';
import Profile from '../profile/screen/profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LogisticContainer from '../logistic';
import Roommate from '../roommate';
import ChatContainer from '../chat';
import {HousewareContainer} from '../houseware';
import {navigationName} from '../../constants/navigation';
const Tab = createBottomTabNavigator();

const Home = props => {
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
        component={Roommate}
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

const styles = StyleSheet.create({});
