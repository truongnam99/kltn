import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_MY_POST, POST_UPDATE_STATUS} from '../../../store/actions/types';
import {selectMyPosts} from '../selectors';
import {selectUserInfo} from '../../login/selectors';

export const useMyPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectMyPosts);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch({type: FETCH_MY_POST, payload: null});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFoundRoommate = id => {
    dispatch({type: POST_UPDATE_STATUS, payload: id});
  };

  return {
    selectors: {posts, userInfo},
    handlers: {handleFoundRoommate},
  };
};
