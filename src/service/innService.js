import firestore from '@react-native-firebase/firestore';
import {clientIndex} from '../config/algolia';

export function fetchDataFromFirebase({
  limit = 10,
  minPrice,
  maxPrice,
  city,
  district,
  last,
  minArea,
  maxArea,
  garage,
  kitchen,
}) {
  let query = firestore().collection('Inns').orderBy('room_price', 'asc');
  if (minArea) {
    query = query.where('room_area', '>=', minArea);
  }
  if (maxArea) {
    query = query.where('room_area', '<=', maxArea);
  }
  if (maxPrice) {
    query = query.where('room_price', '<=', maxPrice);
  }
  if (minPrice) {
    query = query.where('room_price', '>=', minPrice);
  }
  if (city) {
    query = query.where('full_address_object.city.code', '==', city);
  }
  if (district) {
    query = query.where('full_address_object.district.code', '==', district);
  }
  if (kitchen) {
    query = query.where('room_ketchen', '==', kitchen);
  }
  if (garage) {
    query = query.where('parking_situation', '==', garage);
  }
  if (last) {
    query = query.startAfter(last);
  }
  return query.limit(limit).get();
}

export function fetchDataFromAlgolia({
  searchText,
  limit = 10,
  minPrice,
  maxPrice,
  city,
  district,
  minArea,
  maxArea,
  garage,
  kitchen,
  count = 0,
  typeOfItem,
  location,
  maxRadius = 5000,
  type,
}) {
  let filters = [];
  let facetFilter = [];
  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      filters.push(`room_price:${minPrice} TO ${maxPrice}`);
    } else if (minPrice) {
      filters.push(`room_price > ${minPrice}`);
    } else {
      filters.push(`room_price < ${maxPrice}`);
    }
  }
  if (minArea || maxArea) {
    if (minArea && maxArea) {
      filters.push(`room_area:${minArea} TO ${maxArea}`);
    } else if (minArea) {
      filters.push(`room_area > ${minArea}`);
    } else {
      filters.push(`room_area < ${maxArea}`);
    }
  }
  if (kitchen) {
    filters.push(`room_ketchen:${kitchen}`);
  }
  if (type) {
    filters.push(`type = ${type}`);
  }
  if (garage) {
    filters.push(`parking_situation:${kitchen}`);
  }
  if (city) {
    facetFilter.push(`full_address_object.city.code:${city}`);
  }
  if (district) {
    facetFilter.push(`full_address_object.district.code:${district}`);
  }
  const filter = filters.join(' AND ');

  if (typeOfItem === 'map') {
    return clientIndex.search(searchText, {
      cacheable: true,
      filters: filter,
      facets: '*',
      facetFilters: facetFilter,
      aroundLatLng: `${location.latitude},${location.longitude}`,
      aroundRadius: maxRadius,
    });
  } else {
    return clientIndex.search(searchText, {
      hitsPerPage: limit,
      cacheable: true,
      page: Math.ceil(count / limit),
      filters: filter,
      facets: '*',
      facetFilters: facetFilter,
    });
  }
}

export function createInnInFirebase({isUpdate, ...data}) {
  return firestore()
    .collection('Inns')
    .add({...data, created_at: firestore.FieldValue.serverTimestamp()});
}

export function updateInnInFirebase({isUpdate, ...data}) {
  return firestore()
    .collection('Inns')
    .doc(data.uid)
    .update({...data, update_at: firestore.FieldValue.serverTimestamp()});
}

export function createInnInAlgolia({isUpdate, ...data}) {
  let _geoloc = null;
  if (data.coordinate) {
    _geoloc = {
      lat: data.coordinate.latitude,
      lng: data.coordinate.longitude,
    };
  }
  return clientIndex.saveObject({...data, _geoloc});
}

export function updateInnInAlgolia({isUpdate, uid, ...data}) {
  let _geoloc = null;
  if (data.coordinate) {
    _geoloc = {
      lat: data.coordinate.latitude,
      lng: data.coordinate.longitude,
    };
  }
  return clientIndex.saveObject({objectID: uid, ...data, _geoloc});
}

export function fetchMyInn({uid}) {
  return firestore()
    .collection('Inns')
    .where('created_by.uid', '==', uid)
    .get();
}

export function deleteInnInFirebase(id) {
  return firestore().collection('Inns').doc(id).delete();
}

export function deleteInnInAlgolia(id) {
  return clientIndex.deleteObject(id);
}
