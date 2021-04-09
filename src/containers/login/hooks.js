import {useState} from 'react';
import auth from '@react-native-firebase/auth';

const useHooks = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation: ', confirmation);
    setConfirm(confirmation);
  };

  const confirmCode = async code => {
    try {
      const confirmResult = await confirm.confirm(code);
      console.log('nam: ', confirmResult);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signInWithPhoneNumber,
    confirmCode,
  };
};

export {useHooks};
