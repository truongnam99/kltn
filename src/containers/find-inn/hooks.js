import {useDispatch, useSelector} from 'react-redux';

import {fetchInn} from '../../store/actions/innAction';

const useHooks = () => {
  const dispatch = useDispatch();
  const {inns, count, isLoading} = useSelector(state => state.innReducer);

  const handleFetchInn = ({
    limit = 10,
    name,
    minPrice,
    maxPrice,
    city,
    district,
    address,
    reload,
    searchText,
  }) => {
    if (isLoading) {
      return;
    }

    dispatch(
      fetchInn({
        limit,
        name,
        minPrice,
        maxPrice,
        city,
        district,
        address,
        reload,
        searchText,
      }),
    );
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
