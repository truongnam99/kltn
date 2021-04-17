import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FinnInnContainer from '../find-inn';
import Profile from '../profile/screen/profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Home = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: '#f4f4f4',
      }}>
      <Tab.Screen
        name="Home"
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
        name="shiping"
        component={Profile}
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
        name="find roommate"
        component={Profile}
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
        name="speaker-notes"
        component={Profile}
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
        name="profile"
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
