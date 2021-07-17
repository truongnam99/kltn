import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CheckBox, TextInput} from '.';
import {lightTheme} from '../config/theme';
import Text from './text/text';
import {globalStyles} from '../global.style';
import {selectUserInfo} from '../containers/login/selectors';
import dayjs from 'dayjs';
import {maxReportAllow} from '../config';
import {showMessageInfo} from '../utils/utils';
import {clientIndex} from '../config/algolia';

export const ModalReport = ({visible, id, collection, onClose = () => {}}) => {
  const userInfo = useSelector(selectUserInfo);

  const [state, setState] = useState({
    offense: false,
    violence: false,
    misleading: false,
    untrue: false,
    sexuallyIndecent: false,
    prohibitedContent: false,
    spam: false,
    other: false,
    text: '',
  });

  const onChangeState = useCallback((value, field) => {
    setState(pre => ({
      ...pre,
      [field]: value,
    }));
  }, []);

  const hideItem = async (transaction, sourceData, source) => {
    if (collection === 'Inns') {
      await clientIndex.deleteObject(id);
    }
    const docRef = firestore().doc(collection + 'Hiden/' + id);
    transaction.set(docRef, {
      ...sourceData,
      numberOfReport: sourceData.numberOfReport + 1,
    });
    transaction.delete(source.ref);
  };

  const makePayload = () => {
    const value = {...state};
    if (!state.offense) {
      delete value.offense;
    }
    if (!state.violence) {
      delete value.violence;
    }
    if (!state.misleading) {
      delete value.misleading;
    }
    if (!state.untrue) {
      delete value.untrue;
    }
    if (!state.sexuallyIndecent) {
      delete value.sexuallyIndecent;
    }
    if (!state.prohibitedContent) {
      delete value.prohibitedContent;
    }
    if (!state.spam) {
      delete value.spam;
    }
    if (!state.other) {
      delete value.other;
      delete value.text;
    }
  };

  const onSend = async () => {
    try {
      const reason = makePayload();
      console.log('id: ', id);

      const doc = await firestore().collection('Reports').doc(id).get();
      const rp = {
        reason,
        at: dayjs().format('DD-MM-YYYY'),
        by: userInfo,
      };
      if (doc.exists) {
        const report = doc.data();
        if (!report.users.find(item => item === userInfo.uid)) {
          await firestore().runTransaction(async transaction => {
            const source = await firestore()
              .collection(collection)
              .doc(id)
              .get();

            const sourceData = source.data();
            if (sourceData.numberOfReport + 1 > maxReportAllow) {
              await hideItem(transaction, sourceData, source);
            } else {
              transaction.update(source.ref, {
                numberOfReport: sourceData.numberOfReport + 1,
              });
            }
            transaction.update(doc.ref, {
              items: firestore.FieldValue.arrayUnion(rp),
              users: firestore.FieldValue.arrayUnion(userInfo.uid),
            });
          });
        }
      } else {
        await firestore().runTransaction(async transaction => {
          const source = await firestore().collection(collection).doc(id).get();
          transaction.update(source.ref, {
            numberOfReport: 1,
          });
          const docRef = firestore().doc('Reports/' + id);
          transaction.set(docRef, {
            items: [rp],
            users: [userInfo.uid],
            collection,
            status: 0,
          });
        });
      }
      showMessageInfo('Báo cáo của bạn đã được ghi nhận.');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text types="bold,h2" style={globalStyles.modalHeader}>
            Báo cáo vi phạm
          </Text>
          <ScrollView>
            <CheckBox
              checked={state.offense}
              text="Xúc phạm"
              onChange={value => onChangeState(value, 'offense')}
            />
            <CheckBox
              checked={state.violence}
              text="Bạo lực"
              onChange={value => onChangeState(value, 'violence')}
            />
            <CheckBox
              checked={state.misleading}
              text="Gây hiểu lầm hoặc lừa đảo"
              onChange={value => onChangeState(value, 'misleading')}
            />
            <CheckBox
              checked={state.untrue}
              text="Tin giả, sai sự thật"
              onChange={value => onChangeState(value, 'untrue')}
            />
            <CheckBox
              checked={state.sexuallyIndecent}
              text="Thiếu đứng đắn về mặt tình dục"
              onChange={value => onChangeState(value, 'sexuallyIndecent')}
            />
            <CheckBox
              checked={state.prohibitedContent}
              text="Nội dung bị cấm"
              onChange={value => onChangeState(value, 'prohibitedContent')}
            />
            <CheckBox
              checked={state.spam}
              text="Spam"
              onChange={value => onChangeState(value, 'spam')}
            />
            <View style={globalStyles.row}>
              <CheckBox
                checked={state.other}
                text="Khác: "
                onChange={value => onChangeState(value, 'other')}
              />
              <TextInput
                type="outline"
                containerStyle={[
                  globalStyles.fullwidth,
                  globalStyles.flex1,
                  !state.other && {backgroundColor: '#c4c4c4'},
                ]}
                value={state.text}
                onChangeText={value => onChangeState(value, 'text')}
                editable={state.other}
              />
            </View>
          </ScrollView>
          <View style={globalStyles.row}>
            <TouchableOpacity
              style={[styles.buttonAcceptTerm, globalStyles.primary]}
              onPress={onSend}>
              <Text style={styles.textSave}>Gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAcceptTerm, globalStyles.ml8]}
              onPress={onClose}>
              <Text style={styles.textAcceptTerm}>Hủy</Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 25,
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
