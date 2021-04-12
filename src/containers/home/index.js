import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {navigationName} from '../../constants/navigation';

const Home = ({navigation}) => {
  const onSignOut = async () => {
    await auth().signOut();
    navigation.navigate(navigationName.login.login);
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => onSignOut()} title="Signout" />
    </View>
  );
};

export default Home;
