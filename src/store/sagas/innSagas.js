import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {clientIndex} from '../../config/algolia';
import {
  ADD_INN,
  INN_RELOAD_LIST,
  SET_IS_END,
  INN_SET_lAST,
  ADD_MY_INN,
  UPDATE_INNS,
  UPDATE_MY_INNS,
} from '../actions/types';

export function* fetchInn({type, payload}) {
  const {isEnd, count} = yield select(state => state.innReducer);

  if (isEnd && !payload.reload) {
    return;
  }
  if (payload.reload) {
    yield put({type: INN_RELOAD_LIST});
  }
  const data = !payload.searchText
    ? yield call(fetchDataFromFirebase, {...payload, count})
    : yield call(fetchDataFromAlgolia, payload);
  if (data && data.length) {
    yield put({type: ADD_INN, payload: data});
    if (data.length < payload.limit) {
      yield put({type: SET_IS_END, payload: true});
    }
  }
}

function* fetchDataFromAlgolia({
  searchText,
  limit = 10,
  minPrice,
  maxPrice,
  city,
  district,
  count = 0,
}) {
  let filter = '';
  let facetFilter = '';
  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      filter += `room_price:${minPrice} TO ${maxPrice}`;
    } else if (minPrice) {
      filter += `room_price > ${minPrice}`;
    } else {
      filter += `room_price < ${maxPrice}`;
    }
  }
  if (city) {
    facetFilter += `full_address_object.city.code:${city}`;
  }
  if (district) {
    if (facetFilter) {
      facetFilter += ' AND ';
    }
    facetFilter += `full_address_object.district.code:${district}`;
  }
  const {hits} = yield clientIndex.search(searchText, {
    hitsPerPage: limit,
    cacheable: true,
    page: Math.ceil(count / limit),
    filters: filter,
    facets: '*',
    facetFilters: facetFilter,
  });
  return hits;
}

function* fetchDataFromFirebase({
  limit = 10,
  name,
  minPrice,
  maxPrice,
  city,
  district,
  address,
}) {
  const {last} = yield select(state => state.innReducer);
  let query = firestore().collection('Inns');

  if (name) {
    query = query.where(
      'room_name',
      'array-contains',
      name.toLocaleLowerCase(),
    );
  }
  if (address) {
    query = query.where(
      'exact_room_address',
      'array-contains',
      address.toLocaleLowerCase(),
    );
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
  query = query.orderBy('room_price');
  if (last) {
    query = query.startAfter(last);
  }

  const results = yield query.limit(limit).get();

  if (results.docs.length) {
    yield put({
      type: INN_SET_lAST,
      payload: results.docs[results.docs.length - 1],
    });
  }

  return results.docs.map(item => item.data());
}

export function* fetchMyInn({type, payload}) {
  const {uid} = yield select(state => state.userReducer.userCredential);
  const results = yield firestore()
    .collection('Inns')
    .where('created_by.uid', '==', uid)
    .get();
  const data = results.docs.map(item => {
    return {uid: item.id, ...item.data()};
  });
  yield put({type: ADD_MY_INN, payload: data});
}

export function* createInn({type, payload}) {
  const {inns, myInns} = yield select(state => state.innReducer);
  if (payload.uid) {
    yield updateInnInFirebase(payload);
    yield updateInnInAlgolia(payload);

    if (inns && inns.length) {
      const index = inns.findIndex(item => item.uid === payload.uid);
      if (index !== -1) {
        inns.splice(index, 1, {...payload});
        yield put({type: UPDATE_INNS, payload: [...inns]});
      }
    }
    if (myInns && myInns.length) {
      const index = myInns.findIndex(item => item.uid === payload.uid);
      if (index !== -1) {
        myInns.splice(index, 1, {...payload});
        yield put({
          type: UPDATE_MY_INNS,
          payload: [...myInns],
        });
      }
    }
  } else {
    const result = yield createInnInFirebase(payload);
    yield createInnInAlgolia({objectID: result.id, ...payload});
    yield put({
      type: ADD_INN,
      payload: {data: {...payload, uid: result.id}, setToFirst: true},
    });
  }
}

function* createInnInFirebase({isUpdate, ...data}) {
  return yield firestore()
    .collection('Inns')
    .add({...data, created_at: firestore.FieldValue.serverTimestamp()});
}

function* updateInnInFirebase({isUpdate, ...data}) {
  return yield firestore()
    .collection('Inns')
    .doc(data.uid)
    .update({...data, update_at: firestore.FieldValue.serverTimestamp()});
}

function* createInnInAlgolia({isUpdate, ...data}) {
  return yield clientIndex.saveObject({...data});
}

function* updateInnInAlgolia({isUpdate, uid, ...data}) {
  return yield clientIndex.saveObject({objectID: uid, ...data});
}
