import firestore from '@react-native-firebase/firestore';

const HousewaresCollection = 'Housewares';

export function createHouseware(payload) {
  return firestore()
    .collection(HousewaresCollection)
    .add({...payload, createdAt: firestore.FieldValue.serverTimestamp()});
}

export const fetchHousewares = ({last, ...options}) => {
  let query = firestore()
    .collection(HousewaresCollection)
    .where('isActive', '==', true);
  if (last) {
    query = query.startAfter(last);
  }
  return query.limit(8).get();
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
