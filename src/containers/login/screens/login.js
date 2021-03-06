import React from 'react';
import {View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {Button} from '../../../components/index';
import {lightTheme} from '../../../config/theme';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
import {showMessageFail} from '../../../utils/utils';
import {useHooks} from '../hooks';
import styles from './login.style';

const ButtonLogin = props => {
  const {icon, title, onPress} = props;
  const startIcon = () => (
    <AntDesignIcon
      name={icon}
      size={32}
      color="white"
      style={styles.marginEnd}
    />
  );

  return (
    <View>
      <Button
        title={title}
        startIcon={startIcon}
        buttonStyle={styles.button}
        onPress={onPress}
      />
    </View>
  );
};

const Login = ({navigation}) => {
  const {handlers} = useHooks({navigation});
  const {
    handleFacebookLogin,
    setUserCredential,
    redirectToAdditionalIfNotHaveUser,
  } = handlers;

  async function onFacebookButtonPress() {
    try {
      const userCredential = await handleFacebookLogin();

      if (!userCredential) {
        throw 'Login fail';
      }

      setUserCredential(userCredential);

      if (userCredential.additionalUserInfo.isNewUser) {
        navigation.navigate(navigationName.login.additionalUserInfo);
      } else {
        redirectToAdditionalIfNotHaveUser(userCredential.user.uid);
      }
    } catch (error) {
      showMessageFail(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <IonIcon name="ios-home" size={176} color={lightTheme.primary} />
      </View>
      <View style={styles.buttonGroup}>
        <ButtonLogin
          icon="facebook-square"
          title={translate.continueWithFacebook}
          onPress={() => {
            onFacebookButtonPress();
          }}
        />
        <ButtonLogin
          icon="phone"
          title={translate.continueWithPhoneNumber}
          onPress={() => {
            navigation.navigate(navigationName.login.loginWithPhoneNumber);
          }}
        />
      </View>
    </View>
  );
};

export default Login;
