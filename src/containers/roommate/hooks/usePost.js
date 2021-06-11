import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetCreateRoommateStatus,
  resetUpdateRoommateStatus,
  resetDeleteRoommateStatus,
  deleteRoommate,
  createRoommate,
  updateRoommate,
} from '../../../store/actions/roommateAction';
import {formatString, getCity, unFormatString} from '../../../utils/utils';
import {selectUserInfo} from '../../login/selectors';
import {
  selectCreateRoommateStatus,
  selectDeleteRoommateStatus,
  selectUpdateRoommateStatus,
} from '../selectors';
import {status} from '../../../constants/constants';

const usePostHook = ({data = {}, navigation}) => {
  const [showInnInfo, setShowInnInfo] = useState(data.haveInnContent || false);
  const [roommate, setRoommate] = useState(
    data.id
      ? {
          ...data,
          city: data.city?.Id,
          district: data.district?.Id,
          innPrice: formatString(data.innPrice, 'currency'),
          innWaterPrice: formatString(data.innWaterPrice, 'currency'),
          innElectricPrice: formatString(data.innElectricPrice, 'currency'),
          innDeposit: formatString(data.innDeposit, 'currency'),
          innArea: formatString(data.innArea, 'currency'),
        }
      : {
          content: '',
          innName: null,
          innOwner: null,
          innPrice: null,
          innAddress: null,
          innWaterPrice: null,
          innElectricPrice: null,
          innArea: null,
          innDeposit: null,
          city: '79',
          district: null,
          job: 0,
          gender: 0,
          age: [20, 30],
        },
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const userInfo = useSelector(selectUserInfo);
  const {status: createRoommateStatus} = useSelector(
    selectCreateRoommateStatus,
  );
  const {status: updateRoommateStatus} = useSelector(
    selectUpdateRoommateStatus,
  );
  const {status: deleteRoommateStatus} = useSelector(
    selectDeleteRoommateStatus,
  );

  const handleSetRoommate = useCallback((value, field) => {
    setRoommate(preState => {
      if (field === 'city' && value !== preState.city) {
        return {
          ...preState,
          city: value,
          district: null,
        };
      } else {
        return {
          ...preState,
          [field]: value,
        };
      }
    });
  }, []);

  const onChangeShowInnInfo = useCallback(() => {
    setShowInnInfo(!showInnInfo);
  }, [showInnInfo]);

  const onContentChange = useCallback(
    text => {
      handleSetRoommate(text, 'content');
    },
    [handleSetRoommate],
  );

  const onInnNameChange = useCallback(
    text => {
      handleSetRoommate(text, 'innName');
    },
    [handleSetRoommate],
  );

  const onInnOwnerChange = useCallback(
    text => {
      handleSetRoommate(text, 'innOwner');
    },
    [handleSetRoommate],
  );

  const onInnPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innPrice');
      } else {
        handleSetRoommate(null, 'innPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnAddressChange = useCallback(
    text => {
      handleSetRoommate(text, 'innAddress');
    },
    [handleSetRoommate],
  );

  const onInnWaterPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innWaterPrice');
      } else {
        handleSetRoommate(null, 'innWaterPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnElectricPriceChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innElectricPrice');
      } else {
        handleSetRoommate(null, 'innElectricPrice');
      }
    },
    [handleSetRoommate],
  );

  const onInnAreaChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innArea');
      } else {
        handleSetRoommate(null, 'innArea');
      }
    },
    [handleSetRoommate],
  );

  const onInnDepositChange = useCallback(
    text => {
      if (text !== '') {
        handleSetRoommate(formatString(text, 'currency'), 'innDeposit');
      } else {
        handleSetRoommate(null, 'innDeposit');
      }
    },
    [handleSetRoommate],
  );

  const onChangeCity = useCallback(
    value => {
      const city = value();
      handleSetRoommate(city, 'city');
    },
    [handleSetRoommate],
  );

  const onChangeDistrict = useCallback(
    value => {
      const district = value();
      handleSetRoommate(district, 'district');
    },
    [handleSetRoommate],
  );

  const onSelectJob = useCallback(
    value => {
      handleSetRoommate(value, 'job');
    },
    [handleSetRoommate],
  );

  const onSelectGender = useCallback(
    value => {
      handleSetRoommate(value, 'gender');
    },
    [handleSetRoommate],
  );

  const onAgeChange = useCallback(
    values => {
      handleSetRoommate(values, 'age');
    },
    [handleSetRoommate],
  );

  const onPost = useCallback(() => {
    const {Districts, ...city} = getCity(roommate.city) || {};
    const {Wards, ...district} =
      Districts?.find(item => item.Id === roommate.district) || {};
    let payload = {
      content: roommate.content,
      haveInnContent: showInnInfo,
      isActive: true,
      district,
      city,
      job: roommate.job,
      gender: roommate.gender,
      age: roommate.age,
      owner: {
        ...userInfo,
      },
    };
    if (showInnInfo) {
      payload = {
        ...payload,
        innName: roommate.innName,
        innOwner: roommate.innOwner,
        innPrice: unFormatString(roommate.innPrice, 'currency'),
        innAddress: roommate.innAddress,
        innWaterPrice: unFormatString(roommate.innWaterPrice, 'currency'),
        innElectricPrice: unFormatString(roommate.innElectricPrice, 'currency'),
        innArea: unFormatString(roommate.innArea, 'currency'),
        innDeposit: unFormatString(roommate.innDeposit, 'currency'),
      };
    }
    if (roommate.id) {
      dispatch(updateRoommate({id: roommate.id, ...payload}));
    } else {
      dispatch(createRoommate(payload));
    }
  }, [userInfo, roommate, showInnInfo, dispatch]);

  const onDeleteRoommate = useCallback(() => {
    setShowDeleteConfirmModal(true);
  }, []);

  const onCloseDeleteConfirmModal = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const onConfirmDelete = useCallback(() => {
    setShowDeleteConfirmModal(false);
    dispatch(deleteRoommate(data.id));
  }, [dispatch, data]);

  useEffect(() => {
    if (
      createRoommateStatus === status.PENDING ||
      updateRoommateStatus === status.PENDING
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (
      createRoommateStatus === status.SUCCESS ||
      updateRoommateStatus === status.SUCCESS
    ) {
      dispatch(resetCreateRoommateStatus());
      dispatch(resetUpdateRoommateStatus());
      navigation.goBack();
    }
  }, [navigation, createRoommateStatus, updateRoommateStatus, dispatch]);

  useEffect(() => {
    if (deleteRoommateStatus === status.PENDING) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);
    }
    if (deleteRoommateStatus === status.SUCCESS) {
      dispatch(resetDeleteRoommateStatus());
      navigation.goBack();
    }
  }, [deleteRoommateStatus, navigation, dispatch]);

  return {
    handlers: {
      onContentChange,
      onChangeCity,
      onChangeDistrict,
      onSelectJob,
      onSelectGender,
      onAgeChange,
      onChangeShowInnInfo,
      onInnNameChange,
      onInnOwnerChange,
      onInnPriceChange,
      onInnAddressChange,
      onInnWaterPriceChange,
      onInnElectricPriceChange,
      onInnAreaChange,
      onInnDepositChange,
      onPost,
      onDeleteRoommate,
      onCloseDeleteConfirmModal,
      onConfirmDelete,
    },
    selectors: {
      showDeleteConfirmModal,
      roommate,
      showInnInfo,
      userInfo,
      loading,
      deleteLoading,
    },
  };
};

export default usePostHook;
