import {useDispatch, useSelector} from 'react-redux';

import {fetchInn} from '../../store/actions/innAction';

const useHooks = () => {
  const dispatch = useDispatch();
  const {inns, count, isLoading} = useSelector(state => state.innReducer);

  const handleFetchInn = () => {
    dispatch(fetchInn(count));
  };

  return {
    handlers: {
      handleFetchInn,
    },

    selectors: {
      inns,
      count,
      isLoading,
    },
  };
};

export default useHooks;
