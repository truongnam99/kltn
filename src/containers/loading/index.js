import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {lightTheme} from '../../config/theme';
import {navigationName} from '../../constants/navigation';
import {setUser} from '../../store/actions/userAction';
import styles from './loading.style';
import {selectUserInfo} from '../login/selectors';
import {getSetting} from '../../store/actions/globalAction';

const Loading = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      navigation.replace(navigationName.login.login);
    } else {
      dispatch(getSetting(currentUser.uid));
      if (!userInfo) {
        const reference = database().ref('/users/' + currentUser.uid);
        reference.once('value').then(data => {
          const user = data.toJSON();
          if (user) {
            dispatch(setUser(user));
            navigation.reset({
              index: 0,
              routes: [{name: navigationName.homeContainer}],
            });
          } else {
            navigation.replace(navigationName.login.additionalUserInfo);
          }
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: navigationName.homeContainer}],
        });
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
