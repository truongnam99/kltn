import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import debounce from 'lodash/debounce';
import {MAP_BOX_ACCESS_TOKEN} from '../../../config/index';
import {changeMessage} from '../../../store/actions/messageAction';
import {fetchInn} from '../../../store/actions/innAction';
import {selectUserInfo} from '../../../containers/login/selectors';
import {navigationName} from '../../../constants/navigation';
import {selectInns, selectCount, selectFetchInnStatus} from '../selectors';
import {status} from '../../../constants/constants';
import {showMessageFail} from '../../../utils/utils';

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
  const [listPlaces, setListPlaces] = useState([]);
  const {uid, role} = useSelector(selectUserInfo) || {};
  const inns = useSelector(selectInns);
  const count = useSelector(selectCount);
  const {status: fetchInnStatus} = useSelector(selectFetchInnStatus);
  const dispatch = useDispatch();

  const onFetchInn = useCallback(
    (props = {}) => {
      handleFetchInn({
        arcsehText: headerText,
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

  const onItemSearchPress = useCallback(value => {
    setLocation(value.coordinate);
    setListPlaces([]);
  }, []);

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

  const delaySearch = useCallback(
    debounce(() => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        headerText,
      )}.json?access_token=${MAP_BOX_ACCESS_TOKEN}&country=vn`;
      fetch(url)
        .then(result => result.json())
        .then(data => {
          const {features} = data;
          setListPlaces(
            features.map(item => ({
              id: item.id,
              name: item.place_name,
              coordinate: {
                longitude: item.geometry.coordinates[0],
                latitude: item.geometry.coordinates[1],
              },
              type: item.geometry.type,
            })),
          );
        })
        .catch(error => {
          showMessageFail('Lỗi search địa điểm. Vui lòng chọn ở map');
        });
    }, 1000),
    [headerText],
  );

  useEffect(() => {
    if (typeOfItem === 'map') {
      if (headerText) {
        delaySearch();
        return delaySearch.cancel;
      }
    }
  }, [headerText, delaySearch]);

  useEffect(() => {
    onFetchInn({reload: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, location]);

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
      onItemSearchPress,
    },
    selectors: {
      listPlaces,
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
