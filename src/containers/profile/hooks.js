import auth from '@react-native-firebase/auth';
import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {logout, updateUser} from '../../store/actions/userAction';
import {navigationName} from '../../constants/navigation';
import {selectUserInfo} from '../login/selectors';
import validator from 'validator';
import {unFormatString} from '../../utils/utils';

const useHooks = ({navigation, route}) => {
  const dispatch = useDispatch();
  const profile = route.params?.profile;
  const user = profile ?? useSelector(selectUserInfo);
  const [isMe] = useState(!!route.params?.profile);
  const [editable, setEditable] = useState(false);
  const [updateValue, setUpdateValue] = useState(user);
  const [validation, setValidation] = useState({});

  const pickerImageCallback = ({didCancel, errorMessage, uri}) => {
    if (didCancel) {
      return;
    }
    if (errorMessage) {
      return;
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.3,
        maxWidth: 100,
      },
      pickerImageCallback,
    );
  };

  const onSignOut = async () => {
    await auth().signOut();
    navigation.replace(navigationName.loading);
    dispatch(logout());
  };

  const onOpenEdit = useCallback(() => {
    setEditable(true);
  }, []);

  const onCancel = useCallback(() => {
    setEditable(false);
    setUpdateValue(user);
  }, [user]);

  const updateProfile = useCallback(() => {
    dispatch(updateUser(updateValue));
  }, [updateValue, dispatch]);

  const onUpdateProfile = useCallback((value, field) => {
    setUpdateValue(pre => ({
      ...pre,
      [field]: value,
    }));
  }, []);

  const onChangeName = useCallback(
    value => {
      setValidation(pre => ({...pre, displayName: !value}));
      onUpdateProfile(value, 'displayName');
    },
    [onUpdateProfile],
  );

  const onChangePhone = useCallback(
    value => {
      setValidation(pre => ({
        ...pre,
        phoneNumber: !validator.isMobilePhone(
          unFormatString(value, 'phoneNumber'),
          'vi-VN',
        ),
      }));
      onUpdateProfile(value, 'phoneNumber');
    },
    [onUpdateProfile],
  );

  return {
    selectors: {user, isMe, editable, updateValue, validation},
    handlers: {
      onOpenEdit,
      onCancel,
      onUpdateProfile,
      onSignOut,
      onChangeName,
      onChangePhone,
      pickImage,
      updateProfile,
    },
  };
};

export default useHooks;
