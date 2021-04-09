import React from 'react';
import {View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

import {Button} from '../../../components/index';
import {lightTheme} from '../../../config/theme';
import {navigationName} from '../../../constants/navigation';
import {translate} from '../../../constants/translate';
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
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const response = await auth().signInWithCredential(facebookCredential);

      navigation.navigate(navigationName.findInn.findInn);
      return response;
    } catch (error) {
      console.log(error);
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
