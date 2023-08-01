import {SET_USER_ID} from './userActionTypes';

export const setUserId = userId => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};
