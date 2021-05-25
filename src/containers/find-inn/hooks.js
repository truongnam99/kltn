import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {changeMessage} from '../../store/actions/messageAction';
import {
  fetchInn,
  setLoading as setLoadingAction,
} from '../../store/actions/innAction';
import {selectUserInfo} from '../login/selectors';

const useHooks = () => {
  const [loading, setLoading] = useState(true);
  const {uid, role} = useSelector(selectUserInfo) || {};
  const {inns, count, isLoading} = useSelector(state => state.innReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .where('users', 'array-contains', uid)
      .onSnapshot(documentSnapshot => {
        dispatch(changeMessage(documentSnapshot.docChanges()));
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

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
    if (isLoading && !reload) {
      return;
    }
    try {
      dispatch(setLoadingAction(true));
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
    } catch (error) {
      console.log('need handle error at handleFetchInn', error);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  return {
    handlers: {
      handleFetchInn,
    },

    selectors: {
      inns,
      count,
      role,
      loading,
    },
  };
};

export default useHooks;
