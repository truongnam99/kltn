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
      handleFetchRoommate({
        reload: true,
        cityId: value.city?.Id,
        districtId: value.district?.Id,
      });
      setFilter(value);
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

  const onLoadmore = useCallback(() => {
    handleFetchRoommate({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
    });
  }, [handleFetchRoommate, filter]);

  const handleFoundRoommate = useCallback(
    (id, isActive) => {
      dispatch(changeRoommateActive({id, isActive}));
    },
    [dispatch],
  );

  const handleFetchRoommate = useCallback(
    (props = {reload: false}) => {
      dispatch(fetchRoommate(props));
    },
    [dispatch],
  );

  return {
    handlers: {
      onFilterButtonPress,
      onLoadmore,
      onOpenPost,
      onGetPosted,
      filterCallBack,
      handleFetchRoommate,
      handleFoundRoommate,
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
