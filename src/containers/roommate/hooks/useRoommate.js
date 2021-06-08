import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {navigationName} from '../../../constants/navigation';
import {fetchRoommate} from '../../../store/actions/roommateAction';
import {POST_UPDATE_STATUS} from '../../../store/actions/types';
import {selectIsLoading, selectRoommates} from '../selectors';
import {selectUserInfo} from '../../login/selectors';

const useHook = ({navigation}) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
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

  const onLoadmore = useCallback(() => {
    handleFetchRoommate({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
    });
  }, [handleFetchRoommate, filter]);

  const handleFoundRoommate = useCallback(
    id => {
      dispatch({type: POST_UPDATE_STATUS, payload: id});
    },
    [dispatch],
  );

  const handleFetchRoommate = useCallback(
    (props = {reload: false}) => {
      if (isLoading && !props.reload) {
        return;
      }

      dispatch(fetchRoommate(props));
    },
    [isLoading, dispatch],
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
      isLoading,
      isShowFilter,
      filter,
    },
  };
};

export default useHook;
