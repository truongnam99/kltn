import {navigationName} from '../../constants/navigation';
import {SET_CURRENT_CONTAINER} from '../actions/types';

export default function navigationReducer(
  state = {currentContainer: navigationName.loading},
  action,
) {
  switch (action.type) {
    case SET_CURRENT_CONTAINER:
      return {...state, currentContainer: action.container};
    default:
      return state;
  }
}
