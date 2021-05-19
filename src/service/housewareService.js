import firestore from '@react-native-firebase/firestore';

export function createHouseware(payload) {
  return firestore()
    .collection('Housewares')
    .add({...payload, createdAt: firestore.FieldValue.serverTimestamp()});
}

export const fetchHousewares = ({last, ...options}) => {
  console.log('options', options);
  let query = firestore().collection('Housewares');
  if (last) {
    query = query.startAfter(last);
  }
  return query.limit(5).get();
};
