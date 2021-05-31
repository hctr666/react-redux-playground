import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  FETCH_USERS_REQUESTED,
} from './actionTypes';

const initialState = {
  users: [],
  loading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case FETCH_USERS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_USERS_REQUESTED:
      return {
        ...state
      };
    default:
      return state;
  }
};
