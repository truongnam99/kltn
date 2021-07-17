import firestore from '@react-native-firebase/firestore';
import {housewareIndex} from '../config/algolia';

const HousewaresCollection = 'Housewares';

export function createHouseware(payload) {
  return firestore()
    .collection(HousewaresCollection)
    .add({...payload, createdAt: firestore.FieldValue.serverTimestamp()});
}

export function createHousewareInAlgolia(object) {
  return housewareIndex.saveObject(object);
}

const fetchHousewaresFromAlgolia = ({searchText, city, district, count}) => {
  const filters = [`isActive:${true}`];
  if (city) {
    filters.push('city:79');
  }
  if (district) {
    filters.push(`district:${district}`);
  }
  return housewareIndex.search(searchText, {
    cacheable: true,
    filters: filters.join(' AND '),
    facets: '*',
    hitsPerPage: 10,
    page: Math.ceil(count / 10),
  });
};

const fetchHousewaresFromFirebase = ({last, city, district, ...options}) => {
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

export const fetchHousewares = options => {
  if (options.searchText) {
    return fetchHousewaresFromAlgolia(options);
  } else {
    return fetchHousewaresFromFirebase(options);
  }
};

export const fetchMyHousewares = ({ownerId, ...options}) => {
  return firestore()
    .collection(HousewaresCollection)
    .where('owner.uid', '==', ownerId)
    .get();
};

export const updateHousewareIsActiveInAlgolia = ({id, isActive}) => {
  return housewareIndex.partialUpdateObject({
    objectID: id,
    isActive,
  });
};

export const updateHousewareIsActive = ({id, isActive}) => {
  return firestore().collection(HousewaresCollection).doc(id).update({
    isActive,
  });
};

export const updateHousewareInAlgolia = ({id, ...payload}) => {
  return housewareIndex.partialUpdateObject({
    objectID: id,
    ...payload,
  });
};

export const updateHouseware = ({id, ...payload}) => {
  return firestore().collection(HousewaresCollection).doc(id).update(payload);
};
