import {produce} from 'immer';
import {SET_SETTING} from '../actions/types';

const initialState = {
  setting: {
    city: '79',
  },
};

export const globalReducer = (state = initialState, {type, payload}) => {
  return produce(state, draft => {
    switch (type) {
      case SET_SETTING:
        draft.setting.city = payload.city;
        draft.setting.district = payload.district;
        break;
    }
  });
};
