import firestore from '@react-native-firebase/firestore';
import {housewareIndex} from '../config/algolia';

const HousewaresCollection = 'Housewares';

export async function createHouseware(payload) {
  const result = await firestore()
    .collection(HousewaresCollection)
    .add({...payload, createdAt: firestore.FieldValue.serverTimestamp()});
  const doc = await result.get();
  housewareIndex.saveObject({objectID: result.id, ...doc.data()});
  return result;
}

export const fetchHousewares = ({last, city, district, ...options}) => {
  let query = firestore()
    .collection(HousewaresCollection)
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

export const fetchHousewaresFromAlgolia = ({
  city,
  district,
  searchText,
  page,
}) => {
  let filterClause = 'city:79';
  if (district) {
    filterClause += ` AND district:${district}`;
  }
  return housewareIndex.search(searchText, {
    hitsPerPage: 10,
    cacheable: true,
    page,
    facets: '*',
    facetFilters: filterClause,
  });
};

export const fetchMyHousewares = ({ownerId, ...options}) => {
  return firestore()
    .collection(HousewaresCollection)
    .where('owner.uid', '==', ownerId)
    .get();
};

export const updateHousewareIsActive = ({id, isActive}) => {
  housewareIndex.partialUpdateObject({
    objectID: id,
    isActive,
  });
  return firestore().collection(HousewaresCollection).doc(id).update({
    isActive,
  });
};

export const updateHouseware = ({id, ...payload}) => {
  housewareIndex.partialUpdateObject({
    objectID: id,
    ...payload,
  });
  return firestore().collection(HousewaresCollection).doc(id).update(payload);
};
