import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {navigationName} from '../../../constants/navigation';
import {
  changeRoommateActive,
  fetchRoommate,
} from '../../../store/actions/roommateAction';
import {selectFetchRoommateStatus, selectRoommates} from '../selectors';
import {selectUserInfo} from '../../login/selectors';
import {status} from '../../../constants/constants';
import {selectSetting} from '../../global/selectors';
import {getCity} from '../../../utils/utils';

const useHook = ({navigation}) => {
  const setting = useSelector(selectSetting);
  const city = getCity(setting?.city);
  const district = city?.Districts.find(item => item.Id === setting?.district);
  const {status: fetchRoommateStatus} = useSelector(selectFetchRoommateStatus);
  const roommates = useSelector(selectRoommates);
  const userInfo = useSelector(selectUserInfo);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    city: {
      Id: city?.Id || '79',
      Name: city?.Name || 'TP. Hồ Chí Minh',
    },
    district: district || null,
    gender: userInfo.gender,
    job: userInfo.job,
    age: userInfo.age,
  });
  const dispatch = useDispatch();

  const onOpenPost = useCallback(() => {
    navigation.navigate(navigationName.roommate.post);
  }, [navigation]);

  const onFilterButtonPress = useCallback(() => {
    setIsShowFilter(!isShowFilter);
  }, [isShowFilter]);

  const filterCallBack = useCallback(
    value => {
      setIsShowFilter(false);
      setFilter(value);
      handleFetchRoommate({
        reload: true,
        ...value,
        cityId: value.city?.Id,
        districtId: value.district?.Id,
      });
    },
    [handleFetchRoommate],
  );

  const onGetPosted = useCallback(() => {
    navigation.navigate(navigationName.roommate.myPost);
  }, [navigation]);

  useEffect(() => {
    handleFetchRoommate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchRoommateStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchRoommateStatus]);

  const handleFoundRoommate = useCallback(
    (id, isActive) => {
      dispatch(changeRoommateActive({id, isActive}));
    },
    [dispatch],
  );

  const handleFetchRoommate = useCallback(
    (props = {reload: false}) => {
      console.log('props: ', props);
      dispatch(
        fetchRoommate({
          cityId: filter?.city?.Id,
          districtId: filter?.district?.Id,
          gender: filter?.gender,
          job: filter?.job,
          ...props,
        }),
      );
    },
    [dispatch, filter],
  );

  const onGotoUpdateRoommate = useCallback(
    data => {
      navigation.navigate(navigationName.roommate.post, {
        data,
      });
    },
    [navigation],
  );

  return {
    handlers: {
      onFilterButtonPress,
      onOpenPost,
      onGetPosted,
      filterCallBack,
      handleFetchRoommate,
      handleFoundRoommate,
      onGotoUpdateRoommate,
    },
    selectors: {
      roommates,
      userInfo,
      loading,
      isShowFilter,
      filter,
    },
  };
};

export default useHook;
