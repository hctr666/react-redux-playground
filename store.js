import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootState from './reducer';
import userState from './usersReducer';
import { watchFetchUsers } from './sagas'

const reducers = combineReducers({
  rootState,
  userState
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware
  )
);

sagaMiddleware.run(watchFetchUsers)

export default store;
