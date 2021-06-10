import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeRoommateActive,
  fetchMyRoommate,
} from '../../../store/actions/roommateAction';
import {selectFetchMyRoommateStatus, selectMyPosts} from '../selectors';
import {selectUserInfo} from '../../login/selectors';
import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';

export const useMyPost = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectMyPosts);
  const userInfo = useSelector(selectUserInfo);
  const {status: fetchMyRoommateStatus} = useSelector(
    selectFetchMyRoommateStatus,
  );

  const onGotoCreateRoommate = data => {
    navigation.navigate(navigationName.roommate.post, {
      data,
    });
  };

  useEffect(() => {
    dispatch(fetchMyRoommate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchMyRoommateStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchMyRoommateStatus]);

  const handleFoundRoommate = useCallback(
    (id, isActive) => {
      dispatch(changeRoommateActive(id, isActive));
    },
    [dispatch],
  );

  return {
    selectors: {posts, userInfo, loading},
    handlers: {handleFoundRoommate, onGotoCreateRoommate},
  };
};
