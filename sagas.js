import { call, put, takeEvery } from 'redux-saga/effects'
import {
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADING,
  FETCH_USERS
} from './actionTypes';

const api = {
  fetchUsers: () => fetch('https://jsonplaceholder.typicode.com/users')
}

function* fetchUsers() {
  try {
    yield put({ type: FETCH_USERS_LOADING, payload: true });

    const response = yield call(api.fetchUsers);
    const payload = yield response.json();

    yield put({ type: FETCH_USERS, payload });
  } finally {
    yield put({ type: FETCH_USERS_LOADING, payload: false });
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS_REQUESTED, fetchUsers);
}

// In case multiple sagas need to be started at once
/* export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    ...
  ])
} */

export {
  watchFetchUsers
}
