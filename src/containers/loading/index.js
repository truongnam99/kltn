import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';

import styles from './loading.style';
import {lightTheme} from '../../config/theme';
import {navigationName} from '../../constants/navigation';
import {setUser} from '../../store/actions/userAction';

const Loading = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer.userInfo);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      navigation.navigate(navigationName.login.login);
    } else {
      if (!userInfo) {
        const reference = database().ref('/users/' + currentUser.uid);
        reference.once('value').then(data => {
          const user = data.toJSON();
          if (user) {
            dispatch(setUser(user));
            navigation.replace(navigationName.homeContainer);
          } else {
            navigation.navigate(navigationName.login.additionalUserInfo);
          }
        });
      } else {
        navigation.replace(navigationName.homeContainer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={lightTheme.primary} size={32} />
    </View>
  );
};

export default Loading;
