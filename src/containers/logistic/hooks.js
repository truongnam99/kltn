import {useDispatch, useSelector} from 'react-redux';
import {fetchLogistic, setLoading} from '../../store/actions/logisticAction';

export const useHooks = () => {
  const dispatch = useDispatch();
  const logistics = useSelector(state => state.logisticReducer.logistics);
  const {isLoading, count} = useSelector(state => state.logisticReducer);
  const {role} = useSelector(state => state.userReducer.userInfo) || {};

  const handlerFetchLogistic = (props = {reload: false}) => {
    if (isLoading) {
      return;
    }

    dispatch(setLoading(true));
    dispatch(fetchLogistic(props));
    dispatch(setLoading(false));
  };

  return {
    handlers: {
      handlerFetchLogistic,
    },
    selectors: {logistics, isLoading, count, role},
  };
};
