import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_MY_LOGISTIC} from '../../../store/actions/types';

export const useMyLogistic = () => {
  const dispatch = useDispatch();
  const {myLogistics: logistics, isLoading} = useSelector(
    state => state.logisticReducer,
  );

  const handleFetchMyLogistic = () => {
    dispatch({type: FETCH_MY_LOGISTIC, payload: null});
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
