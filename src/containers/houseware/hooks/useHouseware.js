import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';
import {
  fetchHousewares,
  updateHousewareIsActive,
} from '../../../store/actions/housewareAction';
import {selectUid} from '../../login/selectors';
import {selectFetchHousewares, selectHousewares} from '../selectors';

export const useHouseware = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    searchText: '',
    city: '79',
  });
  const housewares = useSelector(selectHousewares);
  const uid = useSelector(selectUid);
  const {status: statusFetchHousewares} = useSelector(selectFetchHousewares);

  const onGotoCreateHouseware = () => {
    navigation.navigate(navigationName.houseware.createHouseware);
  };

  const onGotoMyPost = () => {
    navigation.navigate(navigationName.houseware.myHouseware);
  };

  useEffect(() => {
    if (statusFetchHousewares !== status.PENDING) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [statusFetchHousewares]);

  useEffect(() => {
    dispatch(fetchHousewares(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFetchHouseware = () => {
    if (loading) {
      return;
    }
    dispatch(fetchHousewares(filter));
  };

  const handleApplyFilter = useCallback(
    value => {
      if (loading) {
        return;
      }
      const {price, ...newFilter} = value;
      setFilter(preState => {
        return {...preState, ...newFilter};
      });
      dispatch(fetchHousewares({reload: true, ...newFilter}));
    },
    [setFilter, dispatch, loading],
  );

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
    selectors: {housewares, loading, uid},
    handlers: {
      onGotoCreateHouseware,
      onGotoMyPost,
      onFetchHouseware,
      handleApplyFilter,
      onCartItemPress,
      onMarkSold,
    },
  };
};
