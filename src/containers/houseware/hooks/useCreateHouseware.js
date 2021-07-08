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
import {showMessageFail} from '../../../utils/utils';
import {navigationName} from '../../../constants/navigation';

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
  const [validation, setValidation] = useState({
    content: {
      error: false,
      hint: ' ',
    },
    district: {
      error: false,
      hint: ' ',
    },
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

  const handleCheckContent = value => {
    if (!value) {
      setValidation(preState => {
        return {
          ...preState,
          content: {
            error: true,
            hint: 'Nội dung không được để trống',
          },
        };
      });
      return false;
    } else {
      setValidation(preState => {
        return {
          ...preState,
          content: {
            error: false,
            hint: ' ',
          },
        };
      });
      return true;
    }
  };

  const onChangeContent = useCallback(
    value => {
      handleCheckContent(value);
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

  const handleCheckDistrict = district => {
    if (!district) {
      setValidation(preState => {
        return {
          ...preState,
          district: {
            error: true,
            hint: 'Cần chọn quận/huyền',
          },
        };
      });
      return false;
    } else {
      setValidation(preState => {
        return {
          ...preState,
          district: {
            error: false,
            hint: ' ',
          },
        };
      });
      return true;
    }
  };

  const onChangeDistrict = useCallback(
    value => {
      const district = value();
      handleCheckDistrict(district);
      handleSetHouseware(district, 'district');
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
      navigation.goBack(navigationName.houseware.houseware);
      dispatch(resetCreateHousewareStatus());
    }
    if (statusUpdateHouseware === status.SUCCESS) {
      navigation.goBack(navigationName.houseware.myHouseware);
      dispatch(resetUpdateHousewareStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCreateHouseware, statusUpdateHouseware]);

  const onCreateHouseware = () => {
    if (
      !handleCheckContent(houseware.content) ||
      !handleCheckDistrict(houseware.district)
    ) {
      showMessageFail('Vui lòng điền đầy đủ thông tin');
      return;
    }
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
      validation,
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
