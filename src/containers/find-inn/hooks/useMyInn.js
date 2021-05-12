import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fecthMyInn} from '../../../store/actions/innAction';
export const useMyInn = () => {
  const dispatch = useDispatch();
  const myInns = useSelector(state => state.innReducer.myInns);

  const handleFetchMyInn = ({...props}) => {
    dispatch(fecthMyInn(props));
  };

  return {
    handlers: {handleFetchMyInn},
    seletors: {myInns},
  };
};
