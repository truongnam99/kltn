import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMyLogistic} from '../../../store/actions/logisticAction';
import {navigationName} from '../../../constants/navigation';
import {status} from '../../../constants/constants';
import {selectFetchMyLogisticsStatus, selectMyLogistics} from '../selectors';

export const useMyLogistic = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const logistics = useSelector(selectMyLogistics);
  const {status: fetchLogisticsStatus} = useSelector(
    selectFetchMyLogisticsStatus,
  );

  const onGotoCreateLogistic = data => {
    navigation.navigate(navigationName.logistic.createLogistic, {
      data,
    });
  };

  useEffect(() => {
    if (fetchLogisticsStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchLogisticsStatus]);

  useEffect(() => {
    dispatch(fetchMyLogistic());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handlers: {
      onGotoCreateLogistic,
    },
    selectors: {
      logistics,
      loading,
    },
  };
};
