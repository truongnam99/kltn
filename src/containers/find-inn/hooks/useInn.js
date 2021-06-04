import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {changeMessage} from '../../../store/actions/messageAction';
import {
  fetchInn,
  setLoading as setLoadingAction,
} from '../../../store/actions/innAction';
import {selectUserInfo} from '../../../containers/login/selectors';
import {navigationName} from '../../../constants/navigation';
import {selectInns, selectCount, selectIsLoading} from '../selectors';
import {showMessageFail} from '../../../utils/utils';

export const useInn = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [typeOfItem, setTypeOfItem] = useState('large');
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [filter, setFilter] = useState({});

  const {uid, role} = useSelector(selectUserInfo) || {};
  const inns = useSelector(selectInns);
  const count = useSelector(selectCount);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const onFetchInn = useCallback(
    (props = {}) => {
      handleFetchInn({
        searchText: headerText,
        district: filter.district?.Id,
        city: filter.city?.Id,
        minPrice: filter.price?.minPrice,
        maxPrice: filter.price?.maxPrice,
        ...props,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, headerText],
  );
  const onViewDetail = inn => {
    navigation.navigate(navigationName.findInn.innDetail, {
      inn,
    });
  };

  const onGotoCreateInn = () => {
    navigation.navigate(navigationName.findInn.createInn);
  };

  const onGotoMyInn = () => {
    navigation.navigate(navigationName.findInn.myInn);
  };

  const onHeaderChangeText = useCallback(value => {
    setHeaderText(value);
  }, []);

  const onOpenFilter = useCallback(() => {
    setIsShowFilter(!isShowFilter);
  }, [isShowFilter]);

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
      showMessageFail('Không lấy được dữ liệu nhà trọ');
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  const filterCallBack = useCallback(value => {
    setIsShowFilter(false);
    setFilter(value);
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    onFetchInn();
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
    onFetchInn({reload: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onChangeView = useCallback(() => {
    if (typeOfItem === 'large') {
      setTypeOfItem('small');
    }
    if (typeOfItem === 'small') {
      setTypeOfItem('map');
    }
    if (typeOfItem === 'map') {
      setTypeOfItem('large');
    }
  }, [typeOfItem, setTypeOfItem]);

  return {
    handlers: {
      handleFetchInn,
      onChangeView,
      onFetchInn,
      onHeaderChangeText,
      onOpenFilter,
      filterCallBack,
      onViewDetail,
      onGotoCreateInn,
      onGotoMyInn,
    },

    selectors: {
      inns,
      count,
      role,
      loading,
      filter,
      typeOfItem,
      headerText,
      isShowFilter,
    },
  };
};
