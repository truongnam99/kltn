import firestore from '@react-native-firebase/firestore';

export function fetchRoommate({limit = 10, cityId, districtId, last}) {
  let query = firestore().collection('Roommates').where('isActive', '==', true);

  if (last) {
    query = query.startAfter(last);
  }
  if (cityId) {
    query = query.where('city.Id', '==', cityId);
  }
  if (districtId) {
    query = query.where('district.Id', '==', districtId);
  }
  return query.limit(limit).get();
}

export function fetchMyRoommate(id) {
  return firestore().collection('Roommates').where('owner.uid', '==', id).get();
}

export function changeRoommateActive({id, isActive}) {
  return firestore().collection('Roommates').doc(id).update({
    isActive,
  });
}

export function createRoommate(payload) {
  return firestore()
    .collection('Roommates')
    .add({
      ...payload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

export function updateRoommate({id, ...payload}) {
  return firestore()
    .collection('Roommates')
    .doc(id)
    .update({
      ...payload,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}
export function deleteRoommate(id) {
  return firestore().collection('Roommates').doc(id).delete();
}
