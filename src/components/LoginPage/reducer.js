import {
  ENTERED_USERNAME,
  GET_USER_LISTS
} from '../../types/types';


export default function reduxStore(state = {}, action) {

  switch (action.type) {
    case ENTERED_USERNAME:
      return Object.assign({}, state, { username: action.data });

    case GET_USER_LISTS:
      return Object.assign({}, state, { userList: action.data });

    default:
      return state;
  }
}
