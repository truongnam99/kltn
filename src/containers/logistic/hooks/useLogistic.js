import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {navigationName} from '../../../constants/navigation';
import {fetchLogistic} from '../../../store/actions/logisticAction';
import {selectRole} from '../../login/selectors';
import {
  selectCount,
  selectLogistics,
  selectFetchLogisticsStatus,
} from '../selectors';
import {status} from '../../../constants/constants';
import {selectSetting} from '../../global/selectors';
import {getCity} from '../../../utils/utils';

export const useLogistic = ({navigation}) => {
  const setting = useSelector(selectSetting);
  const city = getCity(setting?.city);
  const district = city?.Districts.find(item => item.Id === setting?.district);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    city: {
      Id: city?.Id || '79',
      Name: city?.Name || 'TP. Hồ Chí Minh',
    },
    district: district || null,
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const logistics = useSelector(selectLogistics);
  const {status: fetchLogisticsStatus} = useSelector(
    selectFetchLogisticsStatus,
  );
  const count = useSelector(selectCount);
  const role = useSelector(selectRole);

  const handlerFetchLogistic = (props = {reload: false}) => {
    dispatch(fetchLogistic(props));
  };

  const filterCallBack = useCallback(value => {
    setIsShowFilter(false);
    setFilter(value);
  }, []);

  const onDetailClick = logistic => {
    navigation.navigate(navigationName.logistic.logisticDetail, {logistic});
  };

  const onFetchLogistic = (props = {}) => {
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
    onFetchLogistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchLogisticsStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchLogisticsStatus]);

  useEffect(() => {
    onFetchLogistic({
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
      onFetchLogistic,
    },
    selectors: {
      logistics,
      loading,
      count,
      role,
      isShowFilter,
      filter,
    },
  };
};
