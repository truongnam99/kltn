import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../../../constants/constants';
import {noImage} from '../../../constants/string';
import {
  createHouseware,
  resetCreateHousewareStatus,
  resetUpdateHousewareStatus,
  updateHouseware,
} from '../../../store/actions/housewareAction';
import {selectUserInfo} from '../../login/selectors';
import {selectCreateHouseware, selectUpdateHouseware} from '../selectors';

export const useCreateHouseware = ({navigation, data = {}}) => {
  const userInfo = useSelector(selectUserInfo);
  const {status: statusCreateHouseware} = useSelector(selectCreateHouseware);
  const {status: statusUpdateHouseware} = useSelector(selectUpdateHouseware);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [houseware, setHouseware] = useState({
    owner: data.owner ?? userInfo,
    items: data.items ?? [],
    content: data.content ?? '',
    city: data.city ?? '79',
    district: data.district ?? '762',
    isActive: data.isActive ?? true,
  });

  const handleSetHouseware = useCallback(
    (value, field) => {
      setHouseware(pre => {
        return {
          ...pre,
          [field]: value,
        };
      });
    },
    [setHouseware],
  );

  const onChangeContent = useCallback(
    value => {
      handleSetHouseware(value, 'content');
    },
    [handleSetHouseware],
  );

  const onChangeCity = useCallback(
    value => {
      handleSetHouseware(value(), 'city');
    },
    [handleSetHouseware],
  );

  const onChangeDistrict = useCallback(
    value => {
      handleSetHouseware(value(), 'district');
    },
    [handleSetHouseware],
  );

  const onChangeItems = useCallback(
    value => {
      handleSetHouseware(value, 'items');
    },
    [handleSetHouseware],
  );

  const onItemChangeValue = useCallback(
    (value, index) => {
      const newValue = [...houseware.items];
      newValue[index] = value;
      onChangeItems(newValue);
    },
    [onChangeItems, houseware.items],
  );

  const onRemoveItem = useCallback(
    index => {
      const newValue = [...houseware.items];
      newValue.splice(index, 1);
      onChangeItems(newValue);
    },
    [onChangeItems, houseware.items],
  );

  const onAddNewItem = useCallback(() => {
    onChangeItems([
      ...houseware.items,
      {
        image: noImage,
        price: '',
        description: '',
      },
    ]);
  }, [onChangeItems, houseware.items]);

  const onChangeStatus = useCallback(
    value => {
      handleSetHouseware(value, 'isActive');
    },
    [handleSetHouseware],
  );

  useEffect(() => {
    if (
      statusCreateHouseware === status.PENDING ||
      statusUpdateHouseware === status.PENDING
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (statusCreateHouseware === status.SUCCESS) {
      navigation.goBack();
      dispatch(resetCreateHousewareStatus());
    }
    if (statusUpdateHouseware === status.SUCCESS) {
      navigation.goBack();
      dispatch(resetUpdateHousewareStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCreateHouseware, statusUpdateHouseware]);

  const onCreateHouseware = () => {
    if (data.id) {
      dispatch(updateHouseware({id: data.id, ...houseware}));
    } else {
      dispatch(createHouseware(houseware));
    }
  };

  return {
    selectors: {
      houseware,
      loading,
    },
    handlers: {
      onChangeContent,
      onChangeCity,
      onChangeItems,
      onItemChangeValue,
      onAddNewItem,
      onRemoveItem,
      onCreateHouseware,
      onChangeStatus,
      onChangeDistrict,
    },
  };
};
