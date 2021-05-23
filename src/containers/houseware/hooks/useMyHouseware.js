import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';
import {
  fetchMyHousewares,
  updateHousewareIsActive,
} from '../../../store/actions/housewareAction';
import {selectFetchMyHousewaresStatus, selectMyHousewares} from '../selectors';

export const useMyHouseware = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const housewares = useSelector(selectMyHousewares);
  const fetchMyHousewaresStatus = useSelector(selectFetchMyHousewaresStatus);

  useEffect(() => {
    dispatch(fetchMyHousewares());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchMyHousewaresStatus.status === status.PENDING) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [fetchMyHousewaresStatus]);

  const onCartItemPress = useCallback(
    item => {
      navigation.navigate(navigationName.houseware.createHouseware, {
        data: item,
      });
    },
    [navigation],
  );

  const onMarkSold = useCallback(
    (id, isActive) => {
      dispatch(updateHousewareIsActive({id, isActive}));
    },
    [dispatch],
  );

  return {
    selectors: {housewares, isLoading},
    handlers: {onCartItemPress, onMarkSold},
  };
};
