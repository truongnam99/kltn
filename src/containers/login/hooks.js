import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {setUser} from './actions';
import {navigationName} from '../../constants/navigation';

const useHooks = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  const [userCredential, setUserCredential] = useState(auth().currentUser);
  const [confirm, setConfirm] = useState(null);

  const createUser = async user => {
    await database()
      .ref('/users/' + user.uid)
      .set({
        ...user,
      });
    return user;
  };

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
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
      const confirmResult = await confirm.confirm(code);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToAdditionalIfNotHaveUser = userId => {
    const reference = database().ref('/users/' + userId);
    reference.once('value').then(data => {
      const user = data.toJSON();
      console.log('adddddddd', user);
      if (user) {
        dispatch(setUser(user));
        navigation.navigate(navigationName.findInn.findInn);
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
      createUser,
      setUserCredential,
      redirectToAdditionalIfNotHaveUser,
    },
    selectors: {
      user,
      userCredential,
    },
  };
};

export {useHooks};
