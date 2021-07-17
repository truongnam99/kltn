import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';
import {
  fetchHousewares,
  updateHousewareIsActive,
} from '../../../store/actions/housewareAction';
import {selectSetting} from '../../global/selectors';
import {selectUid} from '../../login/selectors';
import {selectFetchHousewares, selectHousewares} from '../selectors';

export const useHouseware = ({navigation}) => {
  const [searchText, setSearchText] = useState();
  const setting = useSelector(selectSetting);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    searchText: '',
    city: setting?.city || '79',
    district: setting?.district || '',
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
    dispatch(fetchHousewares({...filter, searchText}));
  };

  const onSearch = () => {
    if (loading) {
      return;
    }
    dispatch(fetchHousewares({...filter, searchText, reload: true}));
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
      dispatch(fetchHousewares({reload: true, ...newFilter, searchText}));
    },
    [setFilter, dispatch, loading, searchText],
  );

  const onChangeSearchText = useCallback(value => {
    setSearchText(value);
  }, []);

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
    selectors: {housewares, loading, uid, filter, searchText},
    handlers: {
      onGotoCreateHouseware,
      onGotoMyPost,
      onSearch,
      onFetchHouseware,
      handleApplyFilter,
      onCartItemPress,
      onMarkSold,
      onChangeSearchText,
    },
  };
};
