import {useDispatch, useSelector} from 'react-redux';
import {ROOMMATE_CREATE_POST} from '../../../store/actions/types';

const usePostHook = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.roommateReducer);
  const {userInfo} = useSelector(state => state.userReducer);

  const handlePost = async data => {
    dispatch({
      type: ROOMMATE_CREATE_POST,
      payload: {
        ...data,
        owner: {
          ...userInfo,
        },
      },
    });
  };

  return {
    handlers: {handlePost},
    selectors: {
      userInfo,
      isLoading,
    },
  };
};

export default usePostHook;
