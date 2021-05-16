import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../../store/actions/logisticAction';
import {FETCH_MY_LOGISTIC} from '../../../store/actions/types';

export const useMyLogistic = () => {
  const dispatch = useDispatch();
  const {myLogistics: logistics, isLoading} = useSelector(
    state => state.logisticReducer,
  );

  const handleFetchMyLogistic = () => {
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
