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
import province from '../../../constants/provice.json';
import {formatString, unFormatString} from '../../../utils/utils';
import {selectUserInfo} from '../../login/selectors';
import {
  selectCreateRoommateStatus,
  selectDeleteRoommateStatus,
  selectUpdateRoommateStatus,
} from '../selectors';
import {status} from '../../../constants/constants';

const usePostHook = ({data = {}, navigation}) => {
  const [showInnInfo, setShowInnInfo] = useState(false);
  const [roommate, setRoommate] = useState(
    data.id
      ? {
          ...data,
          innPrice: formatString(data.innPrice, 'currency'),
          innWaterPrice: formatString(data.innWaterPrice, 'currency'),
          innElectricPrice: formatString(data.innElectricPrice, 'currency'),
          innDeposit: formatString(data.innDeposit, 'currency'),
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
          city: {
            Id: '79',
            Name: 'Thành phố Hồ Chí Minh',
          },
          district: {Id: '', Name: ''},
        },
  );
  const [additionalInfo, setAdditionalInfo] = useState({
    job: 0,
    gender: 0,
    age: [20, 30],
  });
  const [districts, setDistricts] = useState([]);
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
      return {
        ...preState,
        [field]: value,
      };
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
      handleSetRoommate(
        {
          Id: value.key,
          Name: value.value,
        },
        'city',
      );
    },
    [handleSetRoommate],
  );

  const onChangeDistrict = useCallback(
    value => {
      handleSetRoommate(
        {
          Id: value.key,
          Name: value.value,
        },
        'district',
      );
    },
    [handleSetRoommate],
  );

  const onSelectJob = useCallback(value => {
    setAdditionalInfo(pre => ({
      ...pre,
      job: value,
    }));
  }, []);

  const onSelectGender = useCallback(value => {
    setAdditionalInfo(pre => ({
      ...pre,
      gender: value,
    }));
  }, []);

  const onAgeChange = useCallback(values => {
    setAdditionalInfo(pre => ({
      ...pre,
      age: values,
    }));
  }, []);

  const onPost = useCallback(() => {
    let payload = {
      content: roommate.content,
      haveInnContent: showInnInfo,
      isActive: true,
      district: roommate.district,
      city: roommate.city,
      ...additionalInfo,
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
        innArea: roommate.innArea,
        innDeposit: unFormatString(roommate.innDeposit, 'currency'),
      };
    }
    if (roommate.id) {
      dispatch(updateRoommate(payload));
    } else {
      dispatch(createRoommate(payload));
    }
  }, [userInfo, roommate, additionalInfo, showInnInfo, dispatch]);

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
    if (!roommate.city.Id) {
      return;
    }

    setDistricts(
      province
        .find(item => item.Id === roommate.city.Id)
        .Districts.map(dt => {
          return {
            key: dt.Id,
            value: dt.Name,
          };
        }),
    );
  }, [roommate.city]);

  useEffect(() => {
    if (!districts.length) {
      return;
    }
    handleSetRoommate(districts[0], 'district');
  }, [districts, handleSetRoommate]);

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
    }
  }, [deleteRoommateStatus, dispatch]);

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
      additionalInfo,
      showInnInfo,
      userInfo,
      loading,
      deleteLoading,
      districts,
    },
  };
};

export default usePostHook;
