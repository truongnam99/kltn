import firestore from '@react-native-firebase/firestore';

const HousewaresCollection = 'Housewares';

export function createHouseware(payload) {
  return firestore()
    .collection(HousewaresCollection)
    .add({...payload, createdAt: firestore.FieldValue.serverTimestamp()});
}

export const fetchHousewares = ({last, city, district, ...options}) => {
  let query = firestore()
    .collection(HousewaresCollection)
    .orderBy('createdAt')
    .where('isActive', '==', true);
  if (city) {
    query = query.where('city', '==', city);
  }
  if (district) {
    query = query.where('district', '==', district);
  }
  if (last) {
    query = query.startAfter(last);
  }
  return query.limit(10).get();
};

export const fetchMyHousewares = ({ownerId, ...options}) => {
  return firestore()
    .collection(HousewaresCollection)
    .where('owner.uid', '==', ownerId)
    .get();
};

export const updateHousewareIsActive = ({id, isActive}) => {
  return firestore().collection(HousewaresCollection).doc(id).update({
    isActive,
  });
};

export const updateHouseware = ({id, ...payload}) => {
  return firestore().collection(HousewaresCollection).doc(id).update(payload);
};
