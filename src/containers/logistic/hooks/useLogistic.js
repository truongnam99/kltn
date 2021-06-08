import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {navigationName} from '../../../constants/navigation';
import {fetchLogistic, setLoading} from '../../../store/actions/logisticAction';
import {selectRole} from '../../login/selectors';
import {selectCount, selectIsLoading, selectLogistics} from '../selectors';

export const useLogistic = ({navigation}) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState(true);
  const dispatch = useDispatch();
  const logistics = useSelector(selectLogistics);
  const isLoading = useSelector(selectIsLoading);
  const count = useSelector(selectCount);
  const role = useSelector(selectRole);

  const handlerFetchLogistic = (props = {reload: false}) => {
    if (isLoading) {
      return;
    }

    dispatch(setLoading(true));
    dispatch(fetchLogistic(props));
    dispatch(setLoading(false));
  };

  const filterCallBack = useCallback(value => {
    setIsShowFilter(false);
    setFilter(value);
  }, []);

  const onDetailClick = logistic => {
    navigation.navigate(navigationName.logistic.logisticDetail, {logistic});
  };

  const onFetchInn = (props = {}) => {
    handlerFetchLogistic(props);
  };

  const onFilterButtonPress = () => {
    setIsShowFilter(!isShowFilter);
  };

  const onGotoCreateLogistic = () => {
    navigation.navigate(navigationName.logistic.createLogistic);
  };
  const onGotoMyLogistic = () => {
    navigation.navigate(navigationName.logistic.myLogistic);
  };

  useEffect(() => {
    onFetchInn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFetchInn({
      cityId: filter?.city?.Id,
      districtId: filter?.district?.Id,
      reload: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return {
    handlers: {
      handlerFetchLogistic,
      filterCallBack,
      onDetailClick,
      onFilterButtonPress,
      onGotoCreateLogistic,
      onGotoMyLogistic,
      onFetchInn,
    },
    selectors: {
      logistics,
      isLoading,
      count,
      role,
      isShowFilter,
      filter,
    },
  };
};
