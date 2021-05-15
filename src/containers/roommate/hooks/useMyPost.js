import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_MY_POST, POST_UPDATE_STATUS} from '../../../store/actions/types';

export const useMyPost = () => {
  const posts = useSelector(state => state.roommateReducer.myPost);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();

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
