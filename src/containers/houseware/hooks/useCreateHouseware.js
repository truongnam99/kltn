import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../../../constants/constants';
import {noImage} from '../../../constants/string';
import {createHouseware} from '../../../store/actions/housewareAction';
import {selectUserInfo} from '../../login/selectors';
import {selectCreateHouseware} from '../selectors';

export const useCreateHouseware = ({navigation}) => {
  const userInfo = useSelector(selectUserInfo);
  const {status: statusCreateHouseware} = useSelector(selectCreateHouseware);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [houseware, setHouseware] = useState({
    owner: userInfo,
    items: [],
    content: '',
    location: '79',
    isActive: true,
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
      handleSetHouseware(value(), 'location');
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

  useEffect(() => {
    if (statusCreateHouseware === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (statusCreateHouseware === status.SUCCESS) {
      navigation.goBack();
    }
  }, [statusCreateHouseware]);

  const onCreateHouseware = () => {
    dispatch(createHouseware(houseware));
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
    },
  };
};
