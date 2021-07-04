import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {clientIndex} from '../config/algolia';

export const updateUser = async payload => {
  if (!payload?.uid) {
    throw Error('Người dùng không hợp lệ');
  }
  await database()
    .ref(`users/${payload.uid}`)
    .update({
      ...payload,
    });
  const housewares = await firestore()
    .collection('Housewares')
    .where('owner.uid', '==', payload.uid)
    .get();
  const inns = await firestore()
    .collection('Inns')
    .where('created_by.uid', '==', payload.uid)
    .get();
  const logistics = await firestore()
    .collection('Logistics')
    .where('owner.uid', '==', payload.uid)
    .get();
  const roommates = await firestore()
    .collection('Roommates')
    .where('owner.uid', '==', payload.uid)
    .get();
  const messages = await firestore()
    .collection('Messages')
    .where('users', 'array-contains', payload.uid)
    .get();

  await firestore().runTransaction(async transaction => {
    housewares.forEach(houseware => {
      transaction.update(houseware.ref, {
        owner: payload,
      });
    });
    inns.forEach(inn => {
      transaction.update(inn.ref, {
        created_by: payload,
      });
    });
    let {results} = await clientIndex.getObjects(inns.docs.map(inn => inn.id));
    results = results.map(item => ({
      ...item,
      created_by: payload,
    }));
    await clientIndex.partialUpdateObjects(results);
    logistics.forEach(logistic => {
      transaction.update(logistic.ref, {
        owner: payload,
      });
    });
    roommates.forEach(roommate => {
      transaction.update(roommate.ref, {
        owner: payload,
      });
    });
    messages.forEach(message => {
      const doc = message.data();
      let userInfos = doc.userInfos;
      if (userInfos[0].id === payload.uid) {
        userInfos[0].name = payload.displayName;
        userInfos[0].photoUrl = payload.photoURL;
      } else {
        userInfos[1].name = payload.displayName;
        userInfos[1].photoUrl = payload.photoURL;
      }
      transaction.update(message.ref, {
        userInfos,
      });
    });
  });
};
