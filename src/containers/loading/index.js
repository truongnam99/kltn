import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './loading.style';
import {lightTheme} from '../../config/theme';
import {navigationName} from '../../constants/navigation';
import {useDispatch} from 'react-redux';
import {setUser} from '../login/actions';

const Loading = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth().currentUser) {
      navigation.navigate(navigationName.login.login);
    } else {
      dispatch(setUser(auth().currentUser));
      navigation.navigate(navigationName.login.additionalUserInfo);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={lightTheme.primary} size={32} />
    </View>
  );
};

export default Loading;
