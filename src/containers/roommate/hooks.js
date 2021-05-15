import {useDispatch, useSelector} from 'react-redux';
import {fetchRoommate} from '../../store/actions/roommateAction';
import {POST_UPDATE_STATUS} from '../../store/actions/types';

const useHook = () => {
  const dispatch = useDispatch();
  const {roommates, isLoading} = useSelector(state => state.roommateReducer);
  const {userInfo} = useSelector(state => state.userReducer);

  const handleFoundRoommate = id => {
    dispatch({type: POST_UPDATE_STATUS, payload: id});
  };

  const handleFetchRoommate = (props = {reload: false}) => {
    if (isLoading && !props.reload) {
      return;
    }

    dispatch(fetchRoommate(props));
  };
  return {
    handlers: {handleFetchRoommate, handleFoundRoommate},
    selectors: {
      roommates,
      userInfo,
      isLoading,
    },
  };
};

export default useHook;
