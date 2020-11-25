import { userList } from './user';

import {
  ENTERED_USERNAME,
  GET_USER_LISTS
} from '../../types/types.js';

export function setUsername(data) {

  return dispatch => dispatch({
    type: ENTERED_USERNAME,
    data: data
  });
};

export function getUserLists() {

  return dispatch => dispatch({
    type: GET_USER_LISTS,
    data: userList
  });
};



