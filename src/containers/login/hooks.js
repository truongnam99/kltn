import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {navigationName} from '../../constants/navigation';
import {
  setUserCredential as setUserCredentialAction,
  setUser,
} from '../../store/actions/userAction';
import {setConfirm as setConfirmAction} from '../../store/actions/loginAction';
import {showMessageFail} from '../../utils/utils';
import {selectConfirm, selectUserCredetial, selectUserInfo} from './selectors';

const useHooks = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const userCredential = useSelector(selectUserCredetial);
  const confirm = useSelector(selectConfirm);

  const createUser = async user => {
    await database()
      .ref('/users/' + user.uid)
      .set({
        ...user,
      });
    return user;
  };

  const setConfirm = confirmation => {
    dispatch(setConfirmAction(confirmation));
  };

  const signInWithPhoneNumber = async phoneNumber => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      throw error;
    }
  };

  const setUserCredential = userCredential => {
    dispatch(setUserCredentialAction(userCredential.user));
  };

  const handleSetUser = user => {
    dispatch(setUser(user));
  };

  const handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const fbUserCredential = await auth().signInWithCredential(
      facebookCredential,
    );

    return fbUserCredential;
  };

  const confirmCode = async code => {
    try {
      const pUserCredential = await confirm.confirm(code);
      if (!pUserCredential) {
        throw 'Confirm code fail';
      }
      setUserCredential(pUserCredential);
      if (pUserCredential.additionalUserInfo.isNewUser) {
        navigation.navigate(navigationName.login.additionalUserInfo);
      } else {
        redirectToAdditionalIfNotHaveUser(pUserCredential.user.uid);
      }
    } catch (error) {
      console.log('error: ', error);
      showMessageFail('Mã xác thực không chính xác');
    }
  };

  const redirectToAdditionalIfNotHaveUser = userId => {
    const reference = database().ref('/users/' + userId);
    reference.once('value').then(data => {
      const user = data.toJSON();
      if (user) {
        dispatch(setUser(user));
        navigation.reset({
          index: 0,
          routes: [{name: navigationName.homeContainer}],
        });
      } else {
        navigation.navigate(navigationName.login.additionalUserInfo);
      }
    });
  };

  return {
    handlers: {
      signInWithPhoneNumber,
      confirmCode,
      handleFacebookLogin,
      handleSetUser,
      setConfirm,
      createUser,
      setUserCredential,
      redirectToAdditionalIfNotHaveUser,
    },
    selectors: {
      user,
      userCredential,
      confirm,
    },
  };
};

export {useHooks};
