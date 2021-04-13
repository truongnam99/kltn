import database from '@react-native-firebase/database';
import React from 'react';
import {View} from 'react-native';
import {Button} from '../../components/index';

export default function Test() {
  const onCreateUser = () => {
    database().ref('/users').push({
      key: '123',
      name: 'Truong Hoang Nam',
      age: 22,
    });
  };

  const onUpdateUser = () => {
    database().ref('/users/123').set({
      name: 'Trương Hoàng Nam',
    });
  };

  return (
    <View>
      <Button title="Create user" onPress={onCreateUser} />
      <Button
        title="Update user"
        onPress={onUpdateUser}
        containerStyle={{marginTop: 10}}
      />
    </View>
  );
}
