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

const useHook = ({navigation}) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const {status: fetchRoommateStatus} = useSelector(selectFetchRoommateStatus);
  const roommates = useSelector(selectRoommates);
  const userInfo = useSelector(selectUserInfo);

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
      console.log('data: ', data);
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
