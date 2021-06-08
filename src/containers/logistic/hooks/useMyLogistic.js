import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../../store/actions/logisticAction';
import {FETCH_MY_LOGISTIC} from '../../../store/actions/types';
import {selectIsLoading, selectMyLogistics} from '../selectors';

export const useMyLogistic = () => {
  const dispatch = useDispatch();
  const logistics = useSelector(selectMyLogistics);
  const isLoading = useSelector(selectIsLoading);

  const handleFetchMyLogistic = () => {
    if (isLoading) {
      return;
    }
    dispatch(setLoading(true));
    dispatch({type: FETCH_MY_LOGISTIC, payload: null});
    dispatch(setLoading(false));
  };

  return {
    handlers: {
      handleFetchMyLogistic,
    },
    selectors: {
      logistics,
      isLoading,
    },
  };
};
