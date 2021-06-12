import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {changeMessage} from '../../../store/actions/messageAction';
import {fetchInn} from '../../../store/actions/innAction';
import {selectUserInfo} from '../../../containers/login/selectors';
import {navigationName} from '../../../constants/navigation';
import {selectInns, selectCount, selectFetchInnStatus} from '../selectors';
import {status} from '../../../constants/constants';

export const useInn = ({navigation}) => {
  const [typeOfItem, setTypeOfItem] = useState('large');
  const [loading, setLoading] = useState(true);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [filter, setFilter] = useState({
    city: {
      Id: '79',
      Name: 'TP. Hồ Chí Minh',
    },
    maxRadius: 5000,
  });
  const [location, setLocation] = useState(null);

  const {uid, role} = useSelector(selectUserInfo) || {};
  const inns = useSelector(selectInns);
  const count = useSelector(selectCount);
  const {status: fetchInnStatus} = useSelector(selectFetchInnStatus);
  const dispatch = useDispatch();

  const onFetchInn = useCallback(
    (props = {}) => {
      handleFetchInn({
        searchText: headerText,
        district: filter.district?.Id,
        city: filter.city?.Id,
        minPrice: filter.price?.minPrice,
        maxPrice: filter.price?.maxPrice,
        minAge: filter.age ? filter.age[0] : null,
        maxAge: filter.age ? filter.age[1] : null,
        minArea: filter.area ? filter.area[0] : null,
        maxArea: filter.area ? filter.area[1] : null,
        kitchen: filter.kitchen,
        garage: filter.garage,
        maxRadius: filter.maxRadius,
        location,
        typeOfItem,
        ...props,
      });
    },
    [filter, headerText, location, typeOfItem, handleFetchInn],
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

  const onChangeLocation = useCallback(
    value => {
      setLocation(value);
      onFetchInn({location: value, reload: true});
    },
    [onFetchInn],
  );

  const handleFetchInn = useCallback(
    payload => {
      dispatch(fetchInn(payload));
    },
    [dispatch],
  );

  const filterCallBack = useCallback(value => {
    setIsShowFilter(false);
    setFilter(value);
  }, []);

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

  useEffect(() => {
    if (fetchInnStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchInnStatus]);

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
      onChangeLocation,
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
      location,
    },
  };
};
