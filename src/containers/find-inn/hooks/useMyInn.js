import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {navigationName} from '../../../constants/navigation';
import {fecthMyInn} from '../../../store/actions/innAction';
export const useMyInn = ({navigation}) => {
  const dispatch = useDispatch();
  const myInns = useSelector(state => state.innReducer.myInns);

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

  return {
    handlers: {handleFetchMyInn, onOpenCreateInnLikeUpdate},
    seletors: {myInns},
  };
};
