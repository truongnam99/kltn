import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './actions';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const useHooks = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const [confirm, setConfirm] = useState(null);
  const updateProfile = async userInfo => {
    await auth().currentUser.updateProfile(userInfo);
  };

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation: ', confirmation);
    setConfirm(confirmation);
  };

  const handleSetUser = user => {
    dispatch(setUser(user));
  };

  const handleFacebookLogin = async () => {
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
    console.log(data.accessToken);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log(facebookCredential);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );

    return userCredential;
  };

  const confirmCode = async code => {
    try {
      const confirmResult = await confirm.confirm(code);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handlers: {
      signInWithPhoneNumber,
      confirmCode,
      handleFacebookLogin,
      handleSetUser,
      updateProfile,
    },
    selectors: {
      user,
    },
  };
};

export {useHooks};
