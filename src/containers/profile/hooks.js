import {useSelector} from 'react-redux';
import {selectUserInfo} from '../login/selectors';

const useHooks = () => {
  const user = useSelector(selectUserInfo);

  return {
    selectors: {user},
    handlers: {},
  };
};

export default useHooks;
