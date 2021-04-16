import {useDispatch, useSelector} from 'react-redux';

const useHooks = () => {
  const user = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();

  return {
    selectors: {user},
    handlers: {},
  };
};

export default useHooks;
