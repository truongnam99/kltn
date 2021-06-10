import firestore from '@react-native-firebase/firestore';
import {showMessageFail} from '../utils/utils';

export function fetchDataFromFirebase({limit = 10, cityId, districtId, last}) {
  try {
    let query = firestore().collection('Logistics');

    if (last) {
      query = query.startAfter(last);
    }
    if (cityId) {
      query = query.where('city', '==', cityId);
    }
    if (districtId) {
      query = query.where('area', 'array-contains', districtId);
    }

    return query.limit(limit).get();
  } catch (error) {
    showMessageFail('Lỗi lấy dữ liệu');
  }
}

export function createLogisticInFirestore({id, ...payload}) {
  let area = null;
  if (payload.area) {
    const index = payload.area.findIndex(item => item === payload.districtId);
    area = [...payload.area];
    if (index === -1) {
      area.push(payload.districtId);
    }
  } else {
    area = [payload.districtId];
  }
  return firestore()
    .collection('Logistics')
    .add({
      ...payload,
      area: area,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

export function updateLogisticInFirestore({id, ...payload}) {
  return firestore()
    .collection('Logistics')
    .doc(id)
    .update({
      ...payload,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

export function deleteLogistic(id) {
  return firestore().collection('Logistics').doc(id).delete();
}

export function fetchMyLogistic(id) {
  return firestore().collection('Logistics').where('owner.uid', '==', id).get();
}
