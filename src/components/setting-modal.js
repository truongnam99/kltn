import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CityPicker, DistrictPicker} from '.';
import {lightTheme} from '../config/theme';
import Text from './text/text';
import {globalStyles} from '../global.style';
import {selectUid} from '../containers/login/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {getObject, saveObject, showMessageFail} from '../utils/utils';
import {getSetting} from '../store/actions/globalAction';

export const SettingModal = ({visible, onClose}) => {
  const [city, setCity] = useState('79');
  const [district, setDistrict] = useState();
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSetting = async () => {
      const result = await getObject(uid);
      if (result?.setting) {
        if (result?.setting?.city) {
          setCity(result?.setting?.city);
        }
        if (result?.setting?.district) {
          setDistrict(result?.setting?.district);
        }
      }
    };
    getSetting();
  }, [uid]);

  const onChangeCity = useCallback(
    value => {
      const newValue = value();
      if (city !== newValue) {
        setCity(newValue);
        setDistrict(null);
      }
    },
    [city],
  );

  const onChangeDistrict = useCallback(
    value => {
      const newValue = value();
      if (newValue !== district) {
        setDistrict(newValue);
      }
    },
    [district],
  );

  const saveSetting = useCallback(async () => {
    try {
      await saveObject(uid, {
        setting: {city, district},
      });
      dispatch(getSetting(uid));
      onClose();
    } catch (error) {
      showMessageFail('Lưu cài đặt bị lỗi');
    }
  }, [city, district, uid, onClose, dispatch]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text types="bold,h2" style={globalStyles.modalHeader}>
            Thiết lập
          </Text>
          <ScrollView>
            <Text types="bold,h2">Thiết lập tìm kiếm</Text>
            <CityPicker value={city} setValue={onChangeCity} />
            <DistrictPicker
              cityId={city}
              value={district}
              setValue={onChangeDistrict}
            />
          </ScrollView>
          <View style={globalStyles.row}>
            <TouchableOpacity
              style={[styles.buttonAcceptTerm, globalStyles.primary]}
              onPress={saveSetting}>
              <Text style={styles.textSave}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAcceptTerm, globalStyles.ml8]}
              onPress={onClose}>
              <Text style={styles.textAcceptTerm}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#c4c4c4a4',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginVertical: 50,
    padding: 10,
    borderRadius: 8,
  },
  buttonAcceptTerm: {
    backgroundColor: lightTheme.grayC4,
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
  textSave: {
    color: 'white',
  },
});
