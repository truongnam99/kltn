import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';
import {fetchHousewares} from '../../../store/actions/housewareAction';
import {selectFetchHousewares, selectHousewares} from '../selectors';

export const useHouseware = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const housewares = useSelector(selectHousewares);
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
    dispatch(fetchHousewares({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFetchHouseware = () => {
    if (loading) {
      return;
    }
    dispatch(fetchHousewares({}));
  };

  return {
    selectors: {housewares, loading},
    handlers: {
      onGotoCreateHouseware,
      onGotoMyPost,
      onFetchHouseware,
    },
  };
};
