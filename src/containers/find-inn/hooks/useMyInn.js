import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';
import {fecthMyInn} from '../../../store/actions/innAction';
import {selectFetchMyInnStatus, selectMyInns} from '../selectors';
export const useMyInn = ({navigation}) => {
  const dispatch = useDispatch();
  const myInns = useSelector(selectMyInns);
  const {status: createMyInnStatus} = useSelector(selectFetchMyInnStatus);
  const [loading, setLoading] = useState(true);

  const onGotoCreateInn = () => {
    navigation.navigate(navigationName.findInn.createInn);
  };

  const onOpenCreateInnLikeUpdate = useCallback(
    data => {
      navigation.navigate(navigationName.findInn.createInn, {
        data: {...data, isUpdate: true},
      });
    },
    [navigation],
  );

  const handleFetchMyInn = useCallback(
    ({...props}) => {
      dispatch(fecthMyInn(props));
    },
    [dispatch],
  );

  useEffect(() => {
    handleFetchMyInn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createMyInnStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [createMyInnStatus]);

  return {
    handlers: {handleFetchMyInn, onOpenCreateInnLikeUpdate, onGotoCreateInn},
    seletors: {myInns, loading},
  };
};
